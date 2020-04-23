import { getClubMessage, addnewClubMessage, updateClubMessage } from '@/services/club';

const ClubModel = {
  namespace: 'club',
  state: {
    clubmessage: ''
  },
  effects: {
    *fetchClubMessage({ payload }, { call, put }) {
      const response = yield call(getClubMessage,payload );
      yield put({
        type: 'saveClubMessage',
        payload: response,
      });
    },
    *fetchAddnewClubMessage({ payload }, { call, put }) {
      const response = yield call(addnewClubMessage, payload);
      console.log(response)
    },
    *fetchUpdateClubMessage({ payload }, { call, put }) {
      const response = yield call(updateClubMessage, payload);
      console.log(response)
    },
  },
  reducers: {
    saveClubMessage(state, action) {
      return { ...state, clubmessage: action.payload.clubmessage || '' };
    },
  },
};
export default ClubModel;
