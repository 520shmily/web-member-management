import request from '@/utils/request';

export async function getAllActivity(params) {
  return request('/api/getActivity', {
    method: 'post',
    data: params,
  });
}

export async function addnewActivity(params) {
  return request('/api/getActivity', {
    method: 'post',
    data: params,
  });
}


export async function updateActivity(params) {
  return request('/api/getActivity', {
    method: 'post',
    data: params,
  });
}

export async function deleteActivity(params) {
  return request('/api/getActivity', {
    method: 'post',
    data: params,
  });
}

export async function getCheckMemberJoinActivity(params) {
  return request('/api/getMemberJoinActivity', {
    method: 'post',
    data: params,
  });
}