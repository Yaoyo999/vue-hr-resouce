// 权限相关的api 
import request from '@/utils/request'

// 获取所有的权限列表
export function getPermissionList () {
  return request({
    method: 'GET',
    url: '/sys/permission'
  })
}