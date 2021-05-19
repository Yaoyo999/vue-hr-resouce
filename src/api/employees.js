// 封装员工相关的接口函数
import request from '@/utils/request'

// 获取员工简单列表
export function getEasyEmployee () {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

// 获取员工列表
export function getEmployee (params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

// 删除员工
export function deleteEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

// 添加员工
export function addEmployee(data){
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

// 封装导入员工的api接口
export function importEmployee(data){
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data
  })
}

//  保存员工的基本信息
export function saveUserDetailInfo (data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取员工个人信息
export function getPersonDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

// 保存员工个人信息
export function savePersonDetail(data) {
  return request({
    url: `/employees/${data.id}/personalInfo`,
    method: 'PUT',
    data
  })
}
// 获取员工岗位信息
export function getPersonJob(id){
  return request({
    url: `/employees/${id}/jobs`,
    method: 'GET'
  })
}

// 保存员工岗位信息
export function savePersonJob(data) {
  return request({
    url: `/employees/${data.id}/jobs`,
    method: 'PUT',
    data
  })
}

// 给员工分配角色
export function assginRoles(data) {
  return request({
    method: 'PUT',
    url: '/sys/user/assignRoles',
    data
  })
}