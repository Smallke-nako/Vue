import request from '@/utils/request'

export function logList(query) {
  return request({
    url: '/loginlog/list',
    method: 'post',
    data: query
  })
}

export function deleteLog(id) {
  return request({
    url: '/loginlog/delete',
    method: 'post',
    params: { id }
  })
}
