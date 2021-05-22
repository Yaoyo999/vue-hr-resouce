import store from '@/store'
// point数据在userInfo中有我们需要获取
export default {
  methods: {
    checkPermPoint (key) {
    const roles = store.state.user.userInfo.roles
    // 判断role中是否有值
    if (roles.points && roles.points.length) {
      // 如果有，判断point中是否有要求的权限点
    return roles.points.some(item => item === key ) // 有就返回true 没有就返回false
    } else {
      return false // 不满足条件直接返回false
    }
    }
  }
}