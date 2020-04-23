import { getManageMessage, updateManageMessage } from '@/services/manage';

const ManageModel = {
  namespace: 'manage',
  state: {
    clubManageMessge: ''
  },
  effects: {
    *fetchClubManageMessge({ payload }, { call, put }) {
      const response = yield call(getManageMessage, payload);
      yield put({
        type: 'saveManageMessge',
        payload: response,
      });
    },

    *fetchUpdateClubManageMessge({ payload }, { call, put }) {
      const response = yield call(updateManageMessage, payload);
    },
  },
  reducers: {
    saveManageMessge(state, action) {
      return { ...state, clubManageMessge: action.payload.clubManageMessge || '' };
    },
  },
};
export default ManageModel;
