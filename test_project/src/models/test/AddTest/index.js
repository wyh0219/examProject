import {app} from '@/index'
import { Modal } from 'antd'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'addtest',
  state: {
    user_id: ''
  },
  reducers: {
    getUserInfo (state, action) {
      return {
        ...state,
        user_id: action.value
      }
    }
  },
  effects: {
    *fetUserInfoAsync (action, { put }) {
      const user = yield app.api.user.userInfo()
      yield put({type: 'getUserInfo', value: user.data.user_id})
    },
    *addExamAsync (action,{put}) {
      // 请求添加试题接口
      const data = yield app.api.test.addTest(action.value)
      if ( data.code ===1 ) {
        Modal.success({
          title: '添加成功',
          content: data.msg,
        })
        yield put(routerRedux.push('/home/checktest'))
      }
    }
  }
}