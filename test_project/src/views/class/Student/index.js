import React, {
  Component
} from 'react'
import {
  connect
} from 'dva'
import {
  Table
} from 'antd';

import Content from '@/components/AntdContent'
import Filtrate from '@/components/AntdFiltrate'


const mapState = state => {
  return state.student
}

const mapDispatch = dispatch => {
  return {
    getList() {
      dispatch({
        type: 'student/getStudentList'
      })
    },
    delStudent(payload) {
      dispatch({
        type: 'student/deleteStudent',
        payload: payload
      })
    },
    getRoom() {
      dispatch({
        type: 'student/getRoomList'
      })
    },
    getClassList(){
      dispatch({
        type:'student/getClassList'
      })
    }
  }
}

@connect(mapState, mapDispatch)

class DdeleteClass extends Component {
  components = {
    Content,
    Filtrate
  }
  componentDidMount() {
    this.props.getList()
    this.props.getRoom()
    this.props.getClassList()
  }
  state = {
    studentList: [],
    columns: [{
        title: '姓名',
        dataIndex: 'student_name',
        key: 'student_name'
      },
      {
        title: '学号',
        dataIndex: 'student_id',
        key: 'student_id'
      },
      {
        title: '班级',
        dataIndex: 'grade_name',
        key: 'grade_id'
      },
      {
        title: '教室',
        dataIndex: 'room_text',
        key: 'room_id'
      },
      {
        title: '密码',
        dataIndex: 'student_pwd',
        key: 'student_pwd'
      },
      {
        title: '操作',
        key: '2',
        dataIndex: '2',
        render: (text, record) => ( 
          <span onClick = {
            () => this.del(record)
          } >
          删除 
          </span>
        )
      }
    ]
  }

  del(id) {
    let data = {
      student_id: id.student_id
    }
    this.props.delStudent(data)
  }

  render() {
    let {studentList,roomList,classList} = this.props
    let {columns} = this.state
    console.log(studentList)
    return ( 
    <Content title = '学生管理' >
    <Filtrate roomList={roomList} classList={classList}/>
    <Table columns = {columns}  dataSource = {studentList} rowKey = {studentList => studentList.student_id}/> 
    </Content> 
    );
  }
}
export default DdeleteClass;
