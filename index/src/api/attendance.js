import request from '@/utils/request'

export function attendanceList(query) {
  return request({
    url: '/attendance/list',
    method: 'post',
    data: query
  })
}

export function updateAttendance(data) {
  return request({
    url: '/attendance/update',
    method: 'post',
    data
  })
}

export function searchDate(query,dateValue) {
  return request({
    url: '/attendance/date',
    method: 'post',
    data: query,
    params: {dateValue}
  })
}

export function deleteTable() {
  return request({
    url: '/attendance/deleteTable',
    method: 'post',
  })
}

export function createTable() {
  return request({
    url: '/attendance/createTable',
    method: 'post',
  })
}

