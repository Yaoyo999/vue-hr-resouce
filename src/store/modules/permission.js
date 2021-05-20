// 引入静态路由
import { constantRoutes } from '@/router/index'
import { asyncRoutes } from '@/router/index'
const state = {
  routes: constantRoutes,
}
const mutations = {
  updateRoutes (state, newRoutes) {
    // 这种业务逻辑是错误的 这样每次的routes会不确定一样
    // state.routes = [...state.routes, ...newRoutes]
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  dispatchRoutes (context, menus) {
    const routes = []
    // 筛选出 动态路由中和menus中能够对上的路由
    menus.forEach(key => {
       // key就是标识
      // asyncRoutes 找 有没有对象中的name属性等于 key的 如果找不到就没权限 如果找到了 要筛选出来
      routes.push(...asyncRoutes.filter(item => item.name === key)) // 得到一个数组 有可能 有元素 也有可能是空数组
    })
    context.commit('updateRoutes', routes) // 将动态路由提交给mutations
    return routes // 这里为什么还要return  state数据 是用来 显示左侧菜单用的  return  是给路由addRoutes用的
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}