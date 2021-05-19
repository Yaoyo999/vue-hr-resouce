// 公司和角色相关的接口
import request from '@/utils/request'
// 获取角色列表
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

// 获取角色详情
export function getDetialRole (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

// 更新角色信息
export function updateRole (data) {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}
// 删除角色信息
export function delteRole (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

// 获取公司信息(id在登录的接口中有)
export function getCompanyInfo(id){
  return request({
    url: `/company/${id}`,
    method: 'GET'
  })
}