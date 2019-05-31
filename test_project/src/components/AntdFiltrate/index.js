import React , {Component} from 'react'
import { 
  Button,
  Form,
  Select,
  Input} from 'antd'
  const {Option} = Select

  @Form.create()
class Filtrate extends Component{
  render () {
    let {roomList,classList} = this.props
    return (
      <Form style={{padding:10}}>
        <Input style={{width:'15%',marginRight:10}} placeholder = "请输入姓名"/> 
        <Select style={{width:'15%',marginRight:10}} onChange={(e) => this.classRoom(e)}>
          {roomList.map((item,index) =>{
            return <Option value={item.room_id} key={item.room_id}>{item.room_text}</Option>
            })
          }
        </Select>
        <Select style={{width:'15%',marginRight:10}} onChange={(e) => this.classRoom(e)}>
          {classList.map((item,index) =>{
            return <Option value={item.grade_id} key={item.grade_id}>{item.grade_name}</Option>
          })
          }
        </Select>
        <Button style={{width:'10%',marginRight:10}} type="primary" size="large" >搜索</Button>
        <Button style={{width:'10%',marginRight:10}} type="primary" size="large" >重置</Button>
      </Form> 
    )
  }
}
export default Filtrate