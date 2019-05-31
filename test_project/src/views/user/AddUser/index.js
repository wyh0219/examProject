import React , {Component} from 'react'
import style from './style.less'
import Update from '../updateUser/index'
import {connect} from 'dva'
import {
    Form, Input, Select, Button, Tabs
  } from 'antd'
const { Option } = Select
const TabPane = Tabs.TabPane
class Adduser extends Component{
  state = {
    formLayout: 'horizontal',
    optionList: [],
    userList: []
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.addUser(values)
      }
    })
  }
  components = {
    Update
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { formLayout } = this.state
    return (
      <div>
        <h1>添加用户</h1>
        <div className="card-container">
          <Tabs type="card">
            <TabPane tab="添加用户" key="1">
              <Form layout={formLayout} onSubmit={this.handleSubmit} className={style.form}>
                <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入你的用户名' }],
                })(
                  <Input placeholder="请输入用户名" />
                )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入你的密码' }],
                  })(
                    <Input type="password" placeholder="请输入密码" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('option', {
                    rules: [{ required: true, message: '请选择身份' }],
                  })(
                    <Select
                      placeholder="请选择身份id"
                    >
                      {
                        this.props.setOptionList.length > 0 && this.props.setOptionList.map(res => {
                          return <Option value={res.identity_id} key={res.identity_id}>{res.identity_text}</Option>
                        })
                      }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    确定
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="修改用户" key="2">
              <Update />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
  componentDidMount () {
    //获取 下拉身份 数据
    this.props.getSelect()
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Adduser)
const mapState = state => {
  return state.adduser
}
const mapActions = dispatch => {
  return {
    /** 
     * getSelect 获取下拉列表数据  
    */
    getSelect () {
      dispatch ({type: 'adduser/getSelectData'})
    },
    addUser (body) {
      dispatch ({
        type: 'adduser/adduser',
        body: body
      })
    }
  }
}
export default connect(
  mapState,
  mapActions
)(WrappedNormalLoginForm)