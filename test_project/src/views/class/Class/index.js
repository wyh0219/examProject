import React,{Component} from 'react'
import {connect} from "dva"
import Content from '@/components/AntdContent'
import { Table, Button ,Divider, Form, Select, Modal, Input  } from 'antd';

const {Option} =Select

const mapStateProps = (state)=>{
  return state.class
  
}
const mapDispatch =(dispatch) =>{
  return {
    classData(){
      dispatch({type:'class/getDataList'})
    },
    delClass(payload){
      dispatch({
      type:'class/delClass',
      payload:payload
    })
    },
    gradeData(){
      dispatch({
        type:'class/getGrade'
      })
    },
    subjectData(){
      dispatch({
        type:'class/getSubject'
      })
    },
    addGrads(payload){
      dispatch({
        type:"class/addGrad",
        payload:payload
      })
    },
    updateGrade(payload){
      dispatch({
        type:'class/updateClass',
        payload:payload
      })
    },
    roomData(){
      dispatch({
        type:'class/roomData'
      })
    }
  }
}

@connect(mapStateProps,mapDispatch)
@Form.create()
class AddClass extends Component {
  components={
    Content
  }
  componentDidMount () {
    this.props.classData()
    this.props.gradeData()
    this.props.subjectData()
    this.props.roomData()
  }
  state= {
    grade_name: '',
    room_id: '',
    subject_id: '',
    room_text: "",
    subject_text: '',
    class_text: '',
    grade_id: '',
    disable:false,
    classList: [],

    columns: [
      {
        title: '班级名',
        dataIndex: 'grade_name',
        key:'grade_id'
      },
      {
        title: '课程名',
        dataIndex: 'subject_text',
        key:'subject_id'
      },
      {
        title: '教室号',
        dataIndex: 'room_text',
        key:'room_id'
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => (
          <span>
            <span onClick={()=>this.mod(record)}>修改</span>
            <Divider type="vertical" />
            <span onClick={ () => this.delete(record)}>删除</span>
          </span>
        ),
      }
    ]
  }

  click = () => {
    this.setState({
      visible: true,
    });
  }
  mod = (record) =>{
    this.setState({
      room_text:record.room_text,
      subject_text:record.subject_text,
      disable:true,
      grade_name:record.grade_name,
      grade_id: record.grade_id,
      visible: true
    })
  }
  delete = (id) =>{
    let data= {
      grade_id : id.grade_id
    }
    this.props.delClass(data)
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
    let {grade_name,room_id,subject_id,disable,grade_id} = this.state
    let data ={
      grade_name:grade_name,
      room_id : room_id,
      subject_id : subject_id,
      grade_id: grade_id,
    }
    if(disable){
      this.props.updateGrade(data)
    }else{
      this.props.addGrads(data)
    }
    setTimeout(()=>{
      this.props.classData()
    },100)
  }

  cancel = () =>{
    this.setState({
      visible: false,
    });
  }
  classRoom = (value) =>{
    this.setState({
        room_id:value
    })
  }

  subject = (value) =>{
    this.setState({
        subject_id : value
    })
  }
  render() {
    let {classList,subject, roomList}=this.props
    let {columns, room_text,subject_text,disable,grade_name} = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <Content  title='班级管理'>
       <Modal
          title="添加班级"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.cancel}
          okText="确认"
          cancelText="取消"
        >
        <Form>
        <Form.Item
        label='班级名'
        >
        {getFieldDecorator('required', {
            initialValue:grade_name,
            rules: [{
              required: true, message: '请输入班级名',
            }],
          })(
            <Input placeholder="班级名" disabled={disable} onBlur={(e)=>{
              this.setState({
                  grade_name: e.target.value
              })
            }}/>
          )}
        </Form.Item>
        <Form.Item
        label='教室号'
        >
         {getFieldDecorator('number', {
           initialValue:room_text,
            rules: [ {
              required: true, message: '请输入教室号',
            }],
          })(
            <Select style={{ width: "100%" }} onChange={(e) => this.classRoom(e)}>
            {roomList.map((item,index) =>{
              return <Option value={item.room_id} key={item.room_id}>{item.room_text}</Option>
              })
            }
           </Select>
          )}
        </Form.Item>
        <Form.Item
        label='课程名'
        >
         {getFieldDecorator('string', {
           initialValue:subject_text,
            rules: [{
              required: true, message: '请输入课程名',
            }],
          })(
            <Select style={{ width: "100%" }} onChange={(e) => this.subject(e)}>
            {subject.map((item,index) =>{
              return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
              })
            }
      </Select>
          )}
        </Form.Item>
       
      </Form>
        </Modal>
       <Button type="primary" icon="plus" size="large" onClick={()=>this.click()}>添加班级</Button>
         <Table columns={columns} dataSource={classList}  rowKey={classList => classList.grade_id}/>
      </Content> 
    );
  }
}

export default AddClass;