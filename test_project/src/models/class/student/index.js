import {app} from '@/index'

export default {
  namespace: 'student',

  state:{
    studentList: [],
    roomList: [],
    classList: []
  },

  reducers: {
    getData(state,{payload}) {
      return {
        ...state,
        studentList:[...payload]
      }
    },

    getRooms(state,{payload}){
      return {
        ...state,
        roomList: [...payload]
      }
    },

    getClass(state,{payload}){
      return {
        ...state,
        classList: [...payload]
      }
    }
  },

  effects: {
    *getStudentList(action,{call,put}){
      const studentList = yield app.api.class.student()
      console.log(studentList)
      yield put ({type:"getData",payload:studentList.data})
    },

    *deleteStudent({payload},{call,put}){
      yield app.api.class.delStudent(payload)
    },

    *getRoomList(action,{call,put}){
      const List = yield app.api.class.roomList()
      yield put ({type:'getRooms',payload:List.data})
    },

    *getClassList(action,{call,put}){
      const list = yield app.api.class.classList()
      yield put({type:'getClass',payload:list.data})
    }
  }
}