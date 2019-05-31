import React,{Component} from 'react';
import {connect} from 'dva'

import styles from './style.less'

import { Layout, Button, Icon, Table, Modal } from 'antd';

const {
  Content
} = Layout;

class ClassifyTest extends Component {
  state = {
    title: '',
    visible: false,
    columns: [{
      title: '类型ID',
      dataIndex: 'questions_type_id',
      key: 'questions_type_id',
    }, {
      title: '类型名称',
      dataIndex: 'questions_type_text',
      key: 'questions_type_text',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span onClick={() => {this.delQuestionsType(record)}}>
          <a href="javascript:;">删除</a>
        </span>
      )
    }]
  }
  componentDidMount () {
    // 获取考试类型
    this.props.getQuestionsType()
  }
  render() {
    const { questionsType } = this.props
    const { columns } = this.state
    return (
      <div className={styles.box}>
        <h3 className={styles.title}>试题分类</h3>
        <div className={styles.content}>
         <Content>
           <div className={styles.add_type}>
            <Button type="添加类型" onClick={this.addExamType}>
              <Icon type="plus" /> 添加类型
            </Button>
           </div>
           <div className={styles.classify_content}>
            <Table rowKey={(record) => record.questions_type_id} dataSource={questionsType} columns={columns}></Table>
           </div>
         </Content>
        </div>
        <div className={styles.show_modal}>
        <Modal
          visible={this.state.visible}
          title="创建新类型"
          footer={[
            <Button key="back" onClick={this.setModalVisible}>取消</Button>,
            <Button key="submit"  onClick={this.addType}>
              确定
            </Button>
          ]}
        > 
          <div className={styles.ipt_type}>
            <input 
            value={this.state.title} 
            onChange={this.changeValue} 
            placeholder='请输入类型名称' />
          </div>
        </Modal>
        </div>
      </div>
    )
  }
  // 点击添加类型显示弹框
  addExamType = () => {
    this.setState({
      visible: true,
    });
  }
  // 属于添加类型的标题
  changeValue = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  // 点击弹框确定添加考试类型
  addType = () => {
    // 添加考试类型
    let max = this.props.questionsType[0].questions_type_sort
    this.props.questionsType.forEach(item => {
      if (item.questions_type_sort > max) {
        max = item.questions_type_sort
      } 
    })
    this.props.addExamType({
      text: this.state.title,
      sort: max + 1
    })
    this.props.getQuestionsType()
    // 关闭弹框
    this.setState({
      visible: false,
    })
  }
  // 关闭弹框
  setModalVisible = (e) => {
    this.setState({
      visible: false,
    });
  }
  // 删除考试类型
  delQuestionsType = (msg) =>{
    this.props.delQuestionsType(msg.questions_type_id)
    this.props.getQuestionsType()
  }
}

const mapState = (state) => {
  return {
    ...state.testclassify
  }
}
const mapDispatch = (dispatch) => {
  return {
    // 获取试题类型
    getQuestionsType () {
      dispatch({
        type:'testclassify/getQuestionsTypeAsync'
      })
    },
    // 添加考试类型
    addExamType (params) {
      dispatch({
        type:'testclassify/addExamTypeAsync',
        value: params
      })
    },
    // 删除类型
    delQuestionsType (id) {
      dispatch({
        type: 'testclassify/delQuestionsType',
        value: id
      })
    }
  }
}
export default connect(mapState,mapDispatch)(ClassifyTest);