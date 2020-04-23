import request from '@/utils/request';

export async function getAllClubMember(params) {
  return request('/api/getClubMember', {
    method: 'post',
    data: params,
  });
}

export async function addClubMember(params) {
  return request('/api/getClubMember', {
    method: 'post',
    data: params,
  });
}

export async function updateClubMember(params) {
  return request('/api/getClubMember', {
    method: 'post',
    data: params,
  });
}

export async function deleteClubMember(params) {
  return request('/api/getClubMember', {
    method: 'post',
    data: params,
  });
}


export async function getMemberJoinActivity(params) {
  return request('/api/getMemberJoinActivity', {
    method: 'post',
    data: params,
  });
}


export async function getResetPassWord(params) {
  return request('/api/getClubMember', {
    method: 'post',
    data: params,
  });
}
