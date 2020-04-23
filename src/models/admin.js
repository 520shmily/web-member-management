import { queryAllClubManageMessge, addClubManageMessge, removeClubManageMessge, updateClubManageMessge } from '@/services/admin';
const AdminModel = {
  namespace: 'admin',
  state: {
    isAddClubManageVisible: false,
    isEditClubManageVisible: false,
    allClubManageMessge: '',
  },
  effects: {
    *fetchAllClubManageMessge({ payload }, { call, put }) {
      const response = yield call(queryAllClubManageMessge, payload);
      yield put({
        type: 'saveAllClubManageMessge',
        payload: response,
      });
    },

    *fetchAddClubManageMessge({ payload }, { call, put }) {
      const response = yield call(addClubManageMessge, payload);
      // yield put({
      //   type: 'isAddSuucess',
      //   payload: response,
      // });
    },

    *fetchRemoveClubManageMessge({ payload }, { call, put }) {
      const response = yield call(removeClubManageMessge, payload);
      // yield put({
      //   type: 'saveAllClubManageMessge',
      //   payload: response,
      // });
    },

    *fetchUpdateClubManageMessge({ payload }, { call, put }) {
      const response = yield call(updateClubManageMessge, payload);
      // yield put({
      //   type: 'saveAllClubManageMessge',
      //   payload: response,
      // });
    },
  },
  reducers: {
    saveAllClubManageMessge(state, action) {
      return { ...state, allClubManageMessge: action.payload.allClubManageMessge || '' };
    },
    changeIsAddStatus(state, action) {
      return { ...state, isAddClubManageVisible: action.payload}
    },
  },
};
export default AdminModel;
