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