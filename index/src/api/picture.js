import request from '@/utils/request'

export function warnList(query) {
  return request({
    url: '/warn/list',
    method: 'post',
    data: query
  })
}

export function deletePicture(id) {
  return request({
    url: '/warn/delete',
    method: 'post',
    params: { id }
  })
}

