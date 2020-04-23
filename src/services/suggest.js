import request from '@/utils/request';

export async function getAllSuggest(params) {
  return request('/api/webSuggest', {
    method: 'post',
    params: params,
  });
}

export async function deleteSuggest(params) {
  return request('/api/deleteSuggest', {
    method: 'post',
    data: params,
  });
}
