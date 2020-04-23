import { getAllSuggest, deleteSuggest } from '@/services/suggest';

const SuggestModel = {
  namespace: 'suggest',
  state: {
    allSuggest: ''
  },
  effects: {
    *fetchAllSuggest({ payload }, { call, put }) {
      const response = yield call(getAllSuggest, payload);
      yield put({
        type: 'saveSuggest',
        payload: response.data,
      });
    },
    *fetchDeleteSuggest({ payload }, { call, put }) {
      const response = yield call(deleteSuggest, payload);
      yield put({
        type: 'saveSuggest',
        payload: response,
      });
    }
  },
  reducers: {
    saveSuggest(state, action) {
      return { ...state, allSuggest: action.payload || '' };
    },
  },
};
export default SuggestModel;
