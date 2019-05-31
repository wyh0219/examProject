import React, {Component} from 'react'
import {message} from 'antd'
import {Redirect} from 'dva/router'

const Authorization = (LayoutComponent) => {
  return class NewLayoutComponent extends Component{
    get isLogin () {
      return window.localStorage.getItem('token')
    }
    render () {
      if (this.isLogin) {
        return <LayoutComponent {...this.props}/>
      } else {
        message.error('请先登录')
        return <Redirect to="/login"/>
      }
    }
  }
}
export default Authorization
