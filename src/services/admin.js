import request from '@/utils/request';

export async function queryAllClubManageMessge(params) {
  return request('/api/getAllClubManageMessge',{
    method: 'POST',
    data: params
  });
}

export async function addClubManageMessge(params) {
  return request('/api/getAllClubManageMessge', {
    method: 'POST',
    data: params,
  });
}

export async function removeClubManageMessge(params) {
  return request('/api/getAllClubManageMessge', {
    method: 'POST',
    data: params,
  });
}

export async function updateClubManageMessge(params) {
  return request('/api/getAllClubManageMessge', {
    method: 'POST',
    data: params,
  });
}
