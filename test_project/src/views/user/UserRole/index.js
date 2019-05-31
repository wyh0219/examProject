import React,{Component} from 'react'
import {connect} from 'dva'
import { Table } from 'antd'

const mapStateToProps = (state) => {
  return state.userrole
}
const mapDispatchToProps = dispatch => {
  return {
    getShowUser () {
      dispatch({
        type: 'userrole/showRole'
      })
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
class DeletedUser extends Component {
  state = {
    columns: [
      {
        title: '用户名',
        dataIndex: 'user_name',
        key: 'user_name',
        render: text => text,
      },
      {
        title: '密码',
        dataIndex: 'user_pwd',
        key: 'user_pwd',
      },
      {
        title: '身份',
        dataIndex: 'identity_text',
        key: 'identity_text',
      }
    ]
  }
  render() {
    return (
      <div>
        <h3>用户数据</h3>
        <Table columns={this.state.columns} dataSource={this.props.showList} />
      </div> 
    )
  }
  componentDidMount () {
    this.props.getShowUser()
  }
}
export default DeletedUser
