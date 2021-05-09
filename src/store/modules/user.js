import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    // 优先在本地存储中寻找实现免登陆的步骤之一，找不到就默认值
    token: getToken() || null
  },
  mutations: {
    getUserToken(state, payload) {
      state.token = payload
      // 获取token并存到本地存储
      setToken(payload)
    },
    // 退出删除用户token
    removeUserToken (state) {
      // 删除vuex中的token
      state.token = null
      // 清除本地缓存中的token
      removeToken()
    }
  },
  actions: {
   async login (context, data) {
    //  应为响应拦截器做了处理我们直接就可以获取到数据值而不需要再去result.data.data
    const result = await login (data)
    console.log(result)
    context.commit('getUserToken', result)
    }
  }
}