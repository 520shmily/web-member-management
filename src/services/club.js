import request from '@/utils/request';

export async function getClubMessage(params) {
  return request('/api/getClubMessage', {
    method: 'post',
    data: params,
  });
}

export async function addnewClubMessage(params) {
  return request('/api/getClubMessage', {
    method: 'post',
    data: params,
  });
}


export async function updateClubMessage(params) {
  return request('/api/getClubMessage', {
    method: 'post',
    data: params,
  });
}