import {app} from '@/index'

export default {
  namespace:'testclassify',
  state: {
    questionsType: []
  },
  reducers: {
    getQuestionsType (state,action) {
      return {
        ...state,
        questionsType: action.value
      }
    }
  },
  effects: {
    // 获取试题类型
    *getQuestionsTypeAsync (action, {put}) {
      const res = yield app.api.test.getQuestionsType()
      if (res.code === 1) {
        yield put({type: 'getQuestionsType', value: res.data})
      }
    },
    // 添加试题类型
    *addExamTypeAsync (action, {put}) {
      const res = yield app.api.test.insertQuestionsType(action.value)
      if (res.code ===1) {
        alert(res.msg)
      }
    },
    // 删除考试类型
    *delQuestionsType (action, {put}) {
      yield app.api.test.delQuestionsTyle({id: action.value})
    }
  }
}