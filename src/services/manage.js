import request from '@/utils/request';

export async function getManageMessage(params) {
  return request('/api/getManageMessage', {
    method: 'POST',
    data: params,
  });
}

export async function updateManageMessage(params) {
  return request('/api/getManageMessage', {
    method: 'POST',
    data: params,
  });
}