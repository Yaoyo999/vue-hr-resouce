// 页面访问控制 以用token为核心控制路由页面的跳转
import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
// 相当于在组件中调用this.$router
const writeList = ['/login', '/404']
// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 开启滚动条
    NProgress.start()
  if (store.getters.token) {
    //如果有token,并且跳转的是登录页面,我们让它去主页(免登录)
    if (to.path === '/login') {
      next('/')
    } else {
      // 跳转的是其他页面放行
      next()
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