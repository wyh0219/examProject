import {app} from '@/index'

export default {
  namespace: 'class',

  state: {
    classList: [],
    gradeList: [],
    subject: [],
    roomList: []
  },

  reducers:{
    classList(state,{payload}) {
      return  {
        ...state, 
        classList:[...payload]
      }
    },

    GradeList(state,{payload}) {
      return {
        ...state,
        gradeList: [...payload]
      }
    },

    subjectList(state, {payload}) {
      return {  
        ...state,
        subject: [...payload]
      }
    },

    roomList(state,{payload}){
      return {
        ...state,
        roomList: [...payload]
      }
    }
  },

  effects: {
    *getDataList(action,{call,put}) {
      const classList = yield app.api.class.classList()
      yield put({type:'classList',payload:classList.data})
    },

    *delClass({payload},{call,put}) {
      yield app.api.class.deleteGrade(payload)
    },

    *getGrade(action,{call,put}) {
      const gradeList = yield app.api.class.grade()
      yield put({type:'GradeList',payload:gradeList.data})
    },

    *getSubject(action,{call,put}) {
      const subject = yield app.api.test.subject()
      yield put({type:"subjectList",payload:subject.data})
    },

    *addGrad({payload},{call,put}) {
      yield app.api.class.addGrade(payload)
    },

    *updateClass({payload},{call,put}) {
      yield app.api.class.updateGrade(payload)
    },

    *roomData(action,{call,put}){
      const room = yield app.api.class.roomList()
      yield put({type:'roomList',payload:room.data})
    }
  }
}