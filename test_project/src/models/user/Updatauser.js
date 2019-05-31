import {app} from '@/index'
import {message} from 'antd'
export default {
  namespace: 'updateuser',
  state: {},
  effects: {
    //获取全部数据 作用:渲染修改页面name下拉框
    *getTypeSelect (action, {call, put}) {
      const getData = yield app.api.user.userList()
      if(getData.code === 1){
        yield put({
          type: 'getShowData',
          payload: getData.data
        })
      }
    },
    //获取下拉数据 作用:渲染修改页面id下拉框
    *getIdSelect (action, {call, put}) {
      const getSelect = yield app.api.user.GetSelectData()
      if(getSelect.code === 1){
        yield put({
          type: 'getIdData',
          payload: getSelect.data
        })
      }
    },
    //修改用户数据
    *updateuser (action, {call, put}) {
      const update = yield app.api.user.updateUser({
        user_id: action.body.select,
        user_name: action.body.userName,
        user_pwd: action.body.password,
        identity_id: action.body.option
      })
      if (update.code === 1){
        message.success('修改成功')
      }
    }
  },
  reducers: {
    getShowData (state, {payload}) {
      return {
        ...state,
        showList: [...payload]
      }
    },
    getIdData (state, {payload}) {
      return {
        ...state,
        selectList: [...payload]
      }
    }
  }
}