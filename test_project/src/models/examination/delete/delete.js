import {app} from '@/index'

export default {
  namespace:'delete',

  state:{
    
  },
  
  reducers: {
    Delete(state, payload) {
      return {
        ...state
      }
    }
  },
  effects: {
    *deleteExam(action, {call,put}) {
      const deletemsg=yield app.api.exam.deleteExam()
      console.log(deletemsg)
      // yield put({type:"Detail",value:detail})
    }
  }
}

