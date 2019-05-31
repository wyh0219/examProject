import React , {Component} from 'react'
import {connect} from 'dva'
import {
    Form, Input, Select, Button
  } from 'antd'
const { Option } = Select
const mapStateToProps = state => {
  return state.updateuser
}
const mapDispatchToProps = dispatch => {
  return {
    getIdSelect () {
      dispatch({
        type: 'updateuser/getTypeSelect'
      })
    },
    getTypeSelect () {
      dispatch({
        type: 'updateuser/getIdSelect'
      })
    },
    updateUser (body) {
      dispatch({
        type: 'updateuser/updateuser',
        body
      })
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
class UpdateUser extends Component{
  state = {
    formLayout: 'horizontal'
  }
  componentDidMount () {
    this.props.getIdSelect()
    this.props.getTypeSelect()
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
        this.props.updateUser(values)
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { formLayout } = this.state
    return (
      <div>
        <Form layout={formLayout} onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('select', {
              rules: [{ required: true, message: '请选择id' }],
            })(
              <Select
                style={{ width: 120 }}
                onChange={this.handleChange}
                placeholder="请选择身份id"
                >
                {this.props.showList && this.props.showList.map(res => {
                    return <Option value={res.user_id} key={res.user_id}>{res.user_name}</Option>
                })}
              </Select>
            )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: false, message: '请输入你的用户名' }],
              })(
                <Input placeholder="请输入用户名" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: false, message: '请输入你的密码' }],
              })(
                <Input type="password" placeholder="请输入密码" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('option', {
                rules: [{ required: false, message: '请选择身份' }],
              })(
                <Select
                    placeholder="请选择身份id"
                >
                {
                  this.props.selectList && this.props.selectList.map(res => {
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
      </div>
    )
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(UpdateUser)
export default WrappedNormalLoginForm