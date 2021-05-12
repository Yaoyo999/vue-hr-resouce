// 公司和角色相关的接口
import request from '@/utils/request'
// 获取角色信息
export function getRole (params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}
// 添加角色信息
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}