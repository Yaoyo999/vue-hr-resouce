import { login, getUserInfo, getBaseUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router/index'
export default {
  namespaced: true,
  state: {
    // 优先在本地存储中寻找实现免登陆的步骤之一，找不到就默认值
    token: getToken() || null,
    userInfo: {} // 空对象而不是null 因为null获取不存在的属性会报错，
    //而对像则不会(我们在getters上建立了name的快捷访问一上来可以获取不到{}则不会报错)
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
    },
    // 更新用户信息的mutation
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo // 重新赋值一个新的对象，这样会触发组件的更新，如果是state.userInfo.name = userInfo 这样不会
      // state.userInfo = {...userInfo} // 这样也可以用 浅拷贝的方式去赋值对象
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 封装登录的action
   async login (context, data) {
    //  应为响应拦截器做了处理我们直接就可以获取到数据值而不需要再去result.data.data
    const result = await login (data) // 获取数据
    console.log(result)
    context.commit('getUserToken', result)  // 将数据存储到vuex中
    },
  // 封装获取用户信息的action
 async getUserInfo (context) {
  const userInfo = await getUserInfo() // 获取数据
  // 同步代码上面的代码执行完后才会执行下面的代码 到下面执行时有userId了 userInfo里面有 
  const baseUserInfo = await getBaseUserInfo(userInfo.userId) // 获取数据
  // console.log(userInfo)
  // console.log(baseUserInfo)
 // 调用mutation
 context.commit('updateUserInfo', { ...userInfo, ...baseUserInfo })  // 将数据存储到vuex中 将数据userInfo和baseUserInfo合并
 return userInfo // 这里为什么要返回 为后面埋下伏笔
 },
 // 退出登录的action
 logOut (context) {
  // 删除用户token(vuex和本地)
  context.commit('removeUserToken')
  // 删除用户信息
  context.commit('removeUserInfo')
 }
}
}