import request from '@/utils/request';

export async function getClubPhotos(params) {
  return request('/api/getImgPhotos', {
    method: 'post',
    data: params,
  });
}


export async function deleterClubPhotos(params) {
  return request('/api/getImgPhotos', {
    method: 'post',
    data: params,
  });
}