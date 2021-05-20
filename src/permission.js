// 页面访问控制 以用token为核心控制路由页面的跳转
import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
import asyncRoutes from '@/router/index'
// 相当于在组件中调用this.$router
const writeList = ['/login', '/404']
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // 开启滚动条
    NProgress.start()
  if (store.getters.token) {
    //如果有token,并且跳转的是登录页面,我们让它去主页(免登录)
    if (to.path === '/login') {
      next('/')
    } else {
      // 有token并且还没有userId说明还没获取用户信息
      if(!store.state.user.userInfo.userId) {
        // 异步函数的返回值我们可以直接定义变量接收
      const { roles:{ menus } } = await store.dispatch('user/getUserInfo')
       // 我们在这处理动态路由 在这儿写逻辑报错我们将下面的逻辑写在store的permission中
      //  const routes = []
      //  menus.forEach(key => {
      //   routes.push(...asyncRoutes.filter(item => item.name === key))
      //  })
      //  console.log(routes)
     const routes =  await store.dispatch('permission/dispatchRoutes', menus)
      // routes就是筛选得到的动态路由
        // 动态路由 添加到 路由表中 默认的路由表 只有静态路由 没有动态路由
        // addRoutes  必须 用 next(地址) 不能用next()
        // router.addRoutes(routes)
        // 我们发现在页面刷新的时候，本来应该拥有权限的页面出现了404，这是因为404的匹配权限放在了静态路由，而动态路由在没有addRoutes之前，找不到对应的地址，就会显示404，所以我们需要将404放置到动态路由的最后
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加到路由表
        // console.log(routes)
        next(to.path) // 相当于跳到对应的地址  相当于多做一次跳转 为什么要多做一次跳转
        // 进门了，但是进门之后我要去的地方的路还没有铺好，直接走，掉坑里，多做一次跳转，再从门外往里进一次，跳转之前 把路铺好，再次进来的时候，路就铺好了
  } else {
        // 跳转的是其他页面放行
        next()
  }
  
    }
  } else {
    // 没有token判断是不是跳转的login和404页面，这两个页面不需要token
    if (writeList.indexOf(to.path) > -1) {
      // 说明跳转的是这两个页面放行
      next()
    } else {
      // 没有token又不是白名单去登录页
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 全局后置守卫
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})