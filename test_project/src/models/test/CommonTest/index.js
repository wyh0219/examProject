import {app} from '@/index'

export default {
  namespace:'allexamtype',
  state: {
    exam_type: [],
    subject_type: [],
    topic_type: []
  },
  reducers: {
    // 考试类型
    getExamType (state,action) {
      return {
        ...state,
        exam_type: action.value
      }
    },
    // 课程类型
    getSubject (state,action) {
      return {
        ...state,
        subject_type: action.value
      }
    },
    // 试题类型
    getQuestionsType (state,action) {
      return {
        ...state,
        topic_type: action.value
      }
    },

  },
  effects: {
    // 获取所有考试类型
    *getAllExamTypeAsync (action, { put }) {
      // 获取所有考试类型
      const exam = yield app.api.test.examType()
      const subject = yield app.api.test.subject()
      const topic = yield app.api.test.getQuestionsType()
      yield put({type: 'getExamType',value: exam.data})
      yield put({type: 'getSubject',value: subject.data})
      yield put({type: 'getQuestionsType',value: topic.data})
    }
  }
}