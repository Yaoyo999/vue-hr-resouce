// 权限相关的api 
import request from '@/utils/request'

// 获取所有的权限列表
export function getPermissionList () {
  return request({
    method: 'GET',
    url: '/sys/permission'
  })
}

// 添加权限点
export function addPermission(data) {
  return request({
    method: 'POST',
    url: '/sys/permission',
    data
  })
}

// 删除权限
export function deletePermission(id) {
  return request({
    method: 'DELETE',
    url: `/sys/permission/${id}`
  })
}

// 获取权限详情
export function getPermissionDetail (id) {
  return request({
    method: 'GET',
    url: `/sys/permission/${id}`
  })
}

// 更新权限详情
export function updatePermission(data) {
  return request({
    method: 'PUT',
    url:  `/sys/permission/${data.id}`,
    data
  })
}
