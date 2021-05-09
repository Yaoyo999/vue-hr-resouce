import request from '@/utils/request'
//登录接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST',
  })
}
// 获取员工基本信息（头像）
export function getBaseUserInfo(userId) {
  return request({
    method: 'GET',
    url: `/sys/user/${userId}`
  })
}
