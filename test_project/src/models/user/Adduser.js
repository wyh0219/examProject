import {app} from '@/index'
import {message} from 'antd'
export default {
  namespace: 'adduser',
  state: {
    setOptionList: []
  },
  reducers: {
    setOptionList (state, {payload}) {
      return {
        ...state,
        setOptionList: [...payload]
      }
    }
  },
  effects: {
    //获取下拉选项数据
    *getSelectData (action, {call, put}) {
      const selectData = yield app.api.user.GetSelectData()
      if(selectData.code === 1){
        yield put({
          type: 'setOptionList',
          payload: selectData.data
        })
      }
    },
    //添加用户
    *adduser (action, {call, put}) {
      const add = yield app.api.user.addUser({
        user_name: action.body.userName,
        user_pwd: action.body.password,
        identity_id: action.body.option
      })
      if(add.code === 1){
        message.success('添加用户成功')
      }else{
        message.error(add.msg)
      }
    }
  }
}