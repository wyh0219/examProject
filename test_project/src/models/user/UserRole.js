import {app} from '@/index'
export default {
  namespace: 'userrole',
  state: {
    showList: []
  },
  effects: {
    *showRole (action, {put, call}) {
      const ShowData = yield app.api.user.userList()
      if(ShowData.code === 1){
        yield put({
          type: 'getShowData',
          payload: ShowData.data
        })
      }
    }
  },
  reducers: {
    getShowData (state, {payload}) {
      return {
        ...state,
        showList: [...payload]
      }
    }
  }
}