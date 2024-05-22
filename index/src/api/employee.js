import request from '@/utils/request'

export function employeeList(query) {
  return request({
    url: '/employee/list',
    method: 'post',
    data: query
  })
}

export function addEmployee(data) {
  return request({
    url: '/employee/create',
    method: 'post',
    data
  })
}

export function searchEmployee(name) {
  return request({
    url: '/employee/search',
    method: 'post',
    params: { name }
  })
}

export function updateEmployee(data) {
  return request({
    url: '/employee/update',
    method: 'post',
    data
  })
}

export function deleteEmployee(id) {
  return request({
    url: '/employee/delete',
    method: 'post',
    params: { id }
  })
}
