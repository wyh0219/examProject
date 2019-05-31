import React,{Component} from 'react'
import { Form,  Select, Table, Button, Radio} from 'antd';
import styles from './style.less'
import {connect} from 'dva'
const mapStateToProps=(state)=>{
    return {
        ...state.index,
        ...state.textList,
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        TextList(){
            dispatch({
                type:'textList/getTextList'
            })
        },
        getAllType () {
            dispatch({
                type: 'index/getAllType'
            })
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps) //装饰器语法
@Form.create() //装饰器语法
class ExamList extends Component {
    state = {  
        states:'全部'
    }
    onChange = (e) => {
        this.setState({ states: e.target.value });
    }
    componentDidMount(){
        this.props.getAllType()
        this.props.TextList()
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
           console.log(values)         
        }
      });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;  
        const { states} = this.state;
        const {list} = this.props   
        return (
          <div>
              <div>
                <h2 className={styles.head}>试卷列表</h2>
              </div>
              <div className={styles.content}>
              <Form onSubmit={this.handleSubmit}>
                  <div className={styles.cont}>
                  <Form.Item>
                    <span>考试类型：</span>
                    {getFieldDecorator('examType', {

                    })(
                        <Select className={styles.headSelect}>
                        {
                            this.props.examType && this.props.examType.map((item,index) => {
                                return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option> 
                            }) 
                        }
                        </Select>
                    )}
                    <span>课程：</span>
                    {getFieldDecorator('classType', {

                    })(
                        <Select className={styles.headSelect}>
                        {
                            this.props.classType && this.props.classType.map((item,index) => {
                                return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option> 
                            }) 
                        }
                        </Select>
                    )}
                    <Button type="primary" icon="search" className={styles.serch} htmlType="submit">查询</Button>
                  </Form.Item>
                  </div>
              </Form>
              </div>
              <div className={styles.content}>
              <div className={styles.contentHead}>
                  <h4>试卷列表</h4>
                <Radio.Group value={states} onChange={this.onChange} style={{ marginBottom: 16 }}>
                <Radio.Button value="全部">全部</Radio.Button>
                <Radio.Button value="进行中">进行中</Radio.Button>
                <Radio.Button value="以结束">以结束</Radio.Button>
                </Radio.Group>
              </div>
              <Table  rowKey={ list => list.exam_id} dataSource={list} columns={this.props.columns}>
                    
              </Table>
              </div>
          </div> 
        );
    }
}

export default ExamList;