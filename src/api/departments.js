// 组织架构的接口
import request from '@/utils/request'

// 获取所以部门的接口函数
export function getDepartments(){
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

// 删除某一项部门的接口函数
export function delDepartment(id){
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

// 添加部门的接口函数
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}