import {app} from '@/index'
export default {
  namespace:'checktest',
  state: {
    listData: [],
    detail:{}
  },
  reducers: {
    questions (state, action) {
      return {
        ...state,
        listData: action.value
      }
    }
  },
  effects: {
    // 获取所有试题
    *questionsAsync (action, {put}) {
      console.log(action)
      const res = yield app.api.test.allTest()
      console.log(res)
      if (res.code === 1) {
        yield put({type:'questions', value: res.data})
      }
    },
    // 筛选试题
    *filtExamDataAsync (action, {put}) {
      const res = yield app.api.test.condition(action.value)
      if (res.code===1) {
        yield put({type: 'questions', value: res.data})
      }
    }
  }
}