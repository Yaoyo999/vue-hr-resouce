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