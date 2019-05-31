import {app} from '@/index'//公共
export default {

  namespace: 'index',

  state: {
    userInfo:[],
    examType:[],
    classType:[],
  },

  reducers: {
    getUserInfo (state, payload) {
      // console.log(payload.value)
      return {
        ...state,
        userInfo:payload.value
      }
    },
    ExamType (state, payload) {
      return {
        ...state,
        examType: payload.value
      }
    },
    ClassType (state, payload) {
      return {
        ...state,
        classType: payload.value
      }
    }
  },

  effects: {
    *getAllType (action, { put }) {
      const userInfo = yield app.api.user.userInfo()
      const data = yield app.api.test.examType()
      const res = yield app.api.test.subject()
      yield put({type:'getUserInfo',value:userInfo.data})
      yield put({type:'ExamType', value: data.data})
      yield put({type:'ClassType', value: res.data})
    },
  },

};
