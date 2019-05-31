import {app} from '@/index'
import { routerRedux } from 'dva/router'
import {message} from 'antd'
export default {
  namespace: 'login',
  state: {},
  effects: {
    *login ({user_name, user_pwd}, {call,put}) {
      //请求登录接口
      const loginInfo = yield app.api.login.login({user_name, user_pwd})
      if(loginInfo === undefined){
        message.error('账号不存在')
      }else{
        if(loginInfo.code === 1){
          message.success('登陆成功')
          yield put({type: 'userInfo'})
          window.localStorage.setItem('token', JSON.stringify(loginInfo.token))
          yield put(routerRedux.push('/home/addtest'))
          } else {
          message.error(loginInfo.msg)
        }
      }
    },
    //获取当前用户信息
    *userInfo (action, {call, put}) {
      const userinfo = yield app.api.user.userInfo()
      console.log(userinfo, 'userinfo')
      yield put({type: 'changeState', payload: {
        user: userinfo.data
      }})
    }
  },
  reducers: {
    changeState (state, action) {
      return {...state, ...action.payload}
    }
  }
}