import { login, getUserInfo, getBaseUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, setTokenTime } from '@/utils/auth'
import router from '@/router/index'
import { resetRouter } from '@/router/index'
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
    // 这里已经获取到了token(我们将获取到的token的时间戳存到Cookie中)
    setTokenTime()
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
    // 当我们换账号之后，虽然看不到菜单，但是用户实际上可以访问页面，直接在地址栏输入地址就能访问
    // 这是因为我们前面在**addRoutes**的时候，一直都是在**加**，登出的时候，我们并没有删，也没有重置，也就是说，我们之前加的路由在登出之后一直在，这怎么处理？
    // 重置路由
    resetRouter()
    // 还有一步  vuex中的数据是不是还在
    // 要清空permission模块下的state数据
    // vuex中 user子模块  permission子模块
    // 子模块调用子模块的action  默认情况下 是能够调用的没有加命令空间的子模块的方法是挂在全局的都可以调用的，但是我们加了命名空间
    // 父模块 调用 子模块的action
    // context.commit('permission/setRoutes', [], { root: true })
    // 子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
  }
 }
}
