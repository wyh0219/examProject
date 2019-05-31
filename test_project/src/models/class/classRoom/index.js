import {app} from '@/index'

export default {
  namespace: 'classRoom',

  state: {
    classRoom: []
  },

  reducers: {
    getData(state,{payload}) {
      return {
        ...state,
        classRoom:[...payload]
      }
    }
  },

  effects: {
    *getDatalist(action,{call,put}){
      const list = yield app.api.class.roomList()
      yield put ({
        type:'getData',
        payload:list.data
      })
    },

    *addRoomList({payload},{call,put}) {
       yield app.api.class.addRoom(payload)
    },

    *delRoomList({payload},{call,put}) {
      yield app.api.class.delRoom(payload)
    }
  }
}