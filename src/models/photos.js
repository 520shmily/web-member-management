import { getClubPhotos, deleterClubPhotos } from '@/services/photos';

const PhotosModel = {
  namespace: 'photos',
  state: {
    clubphotos: ''
  },
  effects: {
    *fetchClubPhotos({ payload  }, { call, put }) {
      const response = yield call(getClubPhotos, payload);
      yield put({
        type: 'saveClubPhotos',
        payload: response,
      });
    },
    *fetchdeleterClubPhotos({ payload  }, { call, put }) {
      const response = yield call(deleterClubPhotos, payload);
    },
  },
  reducers: {
    saveClubPhotos(state, action) {
      return { ...state, clubphotos: action.payload.clubphotos || '' };
    },
  },
};
export default PhotosModel;
