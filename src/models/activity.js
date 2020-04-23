import { getAllActivity, addnewActivity, updateActivity, deleteActivity, getCheckMemberJoinActivity } from '@/services/activity';

const ActivityModel = {
  namespace: 'activity',
  state: {
    allActivity: '',
    isShowEidtModel: false,
    eidtData: '',
    isShowCheckJionMemberModel: false,
    saveCheckMemberJoinActivity: ''
  },
  effects: {
    *fetchAllActivity({ payload }, { call, put }) {
      const response = yield call(getAllActivity, payload);
      yield put({
        type: 'saveAllActivity',
        payload: response,
      });
    },
    *fetchAddnewActivity({ payload }, { call, put }) {
      const response = yield call(addnewActivity, payload);
      console.log(response)
    },
    *fetchUpdateActivity({ payload }, { call, put }) {
      const response = yield call(updateActivity, payload);
    },
    *fetchDeleteActivity({ payload }, { call, put }) {
      const response = yield call(deleteActivity, payload);
      console.log(response)
    },
    *fetchGetCheckMemberJoinActivity({ payload }, { call, put }) {
      const response = yield call(getCheckMemberJoinActivity, payload);
      yield put({
        type: 'saveCheckMemberJoinActivity',
        payload: response,
      });
    },
  },
  reducers: {
    saveAllActivity(state, action) {
      return { ...state, allActivity: action.payload.allActivity || '' };
    },
    saveCheckMemberJoinActivity(state, action) {
      return { ...state, saveCheckMemberJoinActivity: action.payload.saveCheckMemberJoinActivity || '' };
    },
    isShowEidtModel(state, action) {
      return { ...state, isShowEidtModel: action.isShowEidtModel, eidtData: action.eidtData }
    },
    isShowCheckJionMemberModel(state, action) {
      return { ...state, isShowCheckJionMemberModel: action.isShowCheckJionMemberModel }
    }
  },
};
export default ActivityModel;
