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

//根据ID查询部门详情getDetialDept
export function getDetialDept(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

// 根据id修改部门详情
export function eidtDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}