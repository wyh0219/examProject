import React,{Component} from 'react'
import { Table, Button, Modal, Input } from 'antd';

import {connect} from 'dva'

import Content from '@/components/AntdContent'

const confirm = Modal.confirm;
const mapState=(state)=>{

  return state.classRoom
}
const mapDispatch=dispatch =>{
  return {
    getList(){
      dispatch({
        type:'classRoom/getDatalist'
      })
    },
    AddRoom(payload){
      dispatch ({
        type:'classRoom/addRoomList',
        payload:payload
      })
    },
    delRooms(payload){
      dispatch ({
        type:'classRoom/delRoomList',
        payload:payload
      })
    }
  }
}

@connect(mapState, mapDispatch)

class ClassList extends Component {
  componentDidMount () {
    this.props.getList()
  }
  components= {
    Table,
    Content
  }
  state= {
    roomList: [],
    columns: [
      {
        title: '教室号',
        dataIndex: 'room_text',
        key:'room_id'
      },
      {
        title:'操作',
        key:'2',
        dataIndex:'2',
        render: (text,record) => (
          <span onClick={() => this.showDeleteConfirm(record)}>
           删除
          </span>
        )
      }
    ],
    room_id:''
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
    let data = {
      room_text : this.state.room_id
    }
    this.props.AddRoom(data)
    setTimeout(() => {
      this.props.getList()
    }, 100);
  }

  cancel = () =>{
    this.setState({
      visible: false,
    });
  }

  showDeleteConfirm = (id) => {
    let that=this
    confirm({
      title: '确定要删除此教室么',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk  () {
        let data={
          room_id:id.room_id
        }
        that.props.delRooms(data)
        setTimeout(() => {
          that.props.getList()
        }, 100);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    let {classRoom} = this.props
    let {columns} =this.state
    return (
        <Content title='教室管理'>
       <Modal
          title="添加班级"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.cancel}
          okText="确认"
          cancelText="取消"
        >
        <span>教室号</span>
        <Input placeholder="教室号" onChange={e=>{
          this.setState({
            room_id: e.target.value
          })
        }} />
        </Modal>
        <Button type="primary" icon="plus" size="large" onClick={()=>{this.showModal()}}>添加教室</Button>
        <Table columns={columns} dataSource={classRoom}  rowKey={classRoom => classRoom.room_id}/>
        </Content>
    );
  }
}

export default ClassList; 
