import request from '@/utils/request'

export function employeeCount() {
  return request({
    url: '/echarts/employeeCount',
    method: 'get'
  })
}

export function UsersCount(query) {
  return request({
    url: '/echarts/UsersCount',
    method: 'get',
    data: query
  })
}

export function AttendanceCount(query) {
  return request({
    url: '/echarts/AttendanceCount',
    method: 'get',
    data: query
  })
}

export function UnAttendanceCount(query) {
  return request({
    url: '/echarts/UnAttendanceCount',
    method: 'get',
    data: query
  })
}
