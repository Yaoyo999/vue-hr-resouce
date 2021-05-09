import axiso from 'axios'
// 在文件中使用Message组件
import { Message } from 'element-ui'
// 这里的store相当于组件中的this.$store
import store from '@/store/index'
const request = axiso.create({
  baseURL: process.env.VUE_APP_BASE_API, // 执行npm run dev 走的是.env.development 配置的地址(http://ihrm-java.itheima.net/api)
  // 执行npm run bulid走的是 .env.production文件中配置的地址，开发环境和生产环境使用的不是同一套接口 process.env代表当前的环境变量
  timeout: 5000
})
// 因为在后面的请求中我们都要携带token我们可以统一的设置 
request.interceptors.request.use(config => {
  // config是当前请求的配置对象
  // 如果store里面有token说明用户已经登录，后续的请求都需要携带token
  if (store.getters.token) {
    // 配置token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // 必须返回，不然发送不了请求
}, error => {
  return Promise.reject(error)
})
// 我们可以在响应拦截器中结构出我们需要的data就不用results.data.data了
request.interceptors.response.use(response => {
  // axios默认为我们包装了一层data
  // 接口有一个success字段，如果接口失败，后端只是把success字段设置为false，并没有给到我们http错误状态码，http状态码依旧是200，而axios的错误提示需要依赖于非200的状态码，直接导致接口已经失败，但是没有报错提示，所以需要我们手动去触发reject才可以
  const { success, message, data} = response.data
  if (success) {
    // 响应成功就直接返回data数据
    return data
  } else {
    // 当success为false的时候，我们需要让它进入到catch中
    // 提示消息
    Message.error('登录错误，请重试')
    return Promise.reject(new Error(message))
  }
},error => {
  return Promise.reject(error) // 返回执行错误 让当前的执行链进入 catch
})
export default request