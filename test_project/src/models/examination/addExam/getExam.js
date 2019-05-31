import {app} from '@/index'
export default {

  namespace: 'getExam',

  state: {
    createTest:[],
    list:[]
  },

  reducers: {
    addTest (state, payload){ //创建试卷
      const newOption = payload.value
      return {
        ...state,
        createTest: newOption
      }
    }
  },

  effects: {
    *AddTest(action, {call, put}){ //创建试卷
      const listData = yield app.api.exam.addExam(action.options)
       yield put({type:'addTest', value: listData.data})
    }
  }
};
