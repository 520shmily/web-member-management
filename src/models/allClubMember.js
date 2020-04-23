import { getAllClubMember, addClubMember, updateClubMember, deleteClubMember, getMemberJoinActivity, getResetPassWord } from '@/services/allclubmember';

const AllClubMemberModel = {
  namespace: 'clubmember',
  state: {
    allClubMember: '',
    isShowMemberEidtModel: false,
    isShowAssessModel: false,
    eidtData: '',
    MemberJoinActivityData: ''
  },
  effects: {
    *fetchAllClubMember({ payload }, { call, put }) {
      const response = yield call(getAllClubMember, payload);
      yield put({
        type: 'saveAllClubMember',
        payload: response,
      });
    },
    *fetchAddClubMember({ payload }, { call, put }) {
      const response = yield call(addClubMember, payload);
      console.log(response)
    },
    *fetchUpdateClubMember({ payload }, { call, put }) {
      const response = yield call(updateClubMember, payload);
      console.log(response)
    },
    *fetchDeleteClubMember({ payload }, { call, put }) {
      const response = yield call(deleteClubMember, payload);
      console.log(response)
    },
    *fetchgetResetPassWord({ payload }, { call, put }) {
      const response = yield call(getResetPassWord, payload);
      console.log(response)
    },
    *fetchGetMemberJoinActivity({ payload }, { call, put }) {
      const response = yield call(getMemberJoinActivity, payload);
      yield put({
        type: 'saveMemberJoinActivityData',
        payload: response,
      });
    },
  },
  reducers: {
    saveAllClubMember(state, action) {
      return { ...state, allClubMember: action.payload.allClubMember || '' };
    },
    isShowMemberEidtModel(state, action) {
      return { ...state, isShowMemberEidtModel: action.isShowMemberEidtModel, eidtData: action.eidtData}
    },
    isShowAssessModel(state, action) {
      return { ...state, isShowAssessModel: action.isShowAssessModel, eidtData: action.eidtData}
    },
    saveMemberJoinActivityData(state, action) {
      return { ...state, MemberJoinActivityData: action.payload.MemberJoinActivityData }
    }
  },
};
export default AllClubMemberModel;
