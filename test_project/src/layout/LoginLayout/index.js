import React,{Component} from 'react';

import {connect} from 'dva'
import styles from './index.less'
import { withRouter } from 'dva/router'


import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd'
const mapStateToProps = state => {
  return state
}
const mapDispatchToProps = dispatch =>{
  return {
    login: ({userName, password}) => {
      console.log(userName,password)
      dispatch({
        type: 'login/login',
        user_name: userName,
        user_pwd: password
      })
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
@withRouter

class LoginLayout extends Component {
  constructor(props) {
      super(props);
      this.state = {  };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.box}>
          <div className={styles.login}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住账号</Checkbox>
                )}
              </Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <a href="" className={styles.sign}>立即注册</a>
            </Form>
          </div>
      </div>
    )
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.login(values)
      }
    })
  }
}
export default Form.create({ name: 'normal_login' })(LoginLayout)
