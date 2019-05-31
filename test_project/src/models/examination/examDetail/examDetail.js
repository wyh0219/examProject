import {app} from '@/index'

export default {
  namespace:'examDetail',

  state:{
    detail:[]
  },
  
  reducers: {
    Detail(state, payload) {
      return {
        ...state,
        detail:payload
      }
    }
  },
  effects: {
    *getDetail(action, {call,put}) {
      const detail=yield app.api.exam.teacherExamDetail()
      console.log(detail)
      yield put({type:"Detail",value:detail})
    }
  }
}

