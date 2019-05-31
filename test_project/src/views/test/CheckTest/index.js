import React,{Component} from 'react';
import {withRouter} from 'dva/router'
import {connect} from 'dva'

import styles from './style.less'
import { Layout, Select, Button, List, Empty } from 'antd';

const {
  Content
} = Layout

const Option = Select.Option

@withRouter

class CheckTest extends Component {
	componentDidMount () {
    // 获取所有考试类型
    this.props.getAllExamType()
    // 获取所有试题
    this.props.getAllQuestions()
  }
  state = {
    activeIndex: '',
    searchParams: {
      questions_type_id: '',
      subject_id: '',
      exam_id: ''
    }
  }
	render() {
    const {subject_type, exam_type, listData, topic_type} = this.props
		return (
			<div className={styles.box}>
				<h3 className={styles.title}>查看试题</h3>
				<div className={styles.content}>
					<Content>
						{/* 课程类型 */}
						<div className={styles.type}>
							<div className={styles.subject}>
								<label>课程类型:</label>
								<div className={styles.subject_list}>
                  {subject_type.map((item,index) => (
                    <div
                      onClick={() => this.changeBg(index)}
                      className={this.state.activeIndex === index ? styles.active :''} 
                      key={index}
                    >
                      {item.subject_text}
                    </div>
                  ))}
								</div>
							</div>
							<div className={styles.text_type}>
								<div className={styles.kind_type}>
									<div className={styles.exam_type}>
										<label>考试类型:</label>
										<Select defaultValue="" style={{ width: 100 }} onChange={this.examSelect}>
                      {exam_type.map((item,index) => <Option value={item.exam_name} key={index}>{item.exam_name}</Option>)}
										</Select>
									</div>
									<div className={styles.topic_type}>
										<label>题目类型:</label>
										<Select defaultValue="" style={{ width: 100 }} onChange={this.topicSelect}>
                      {topic_type.map((item,index) => <Option value={item.questions_type_text} key={index}>{item.questions_type_text}</Option>)}
										</Select>
									</div>
								</div>
								<div className={styles.search}><Button type="primary" icon="search" onClick={this.search}>查询</Button></div>
							</div>
						</div>
						<div className={styles.list}>
              {
                listData.length > 0 ? <List
                  size="large"
                  bordered
                  dataSource={listData}
                  renderItem={(item,index) => (
                    <List.Item key={index} className={styles.list_item}>
                      <div className={styles.list_cont} onClick={() => this.goDetail(index)}>
                        <h4>{item.title}</h4>
                        <div className={styles.all_btn}>
                          <button className={styles.questions_type}>{item.questions_type_text}</button>
                          <button className={styles.subject_text}>{item.subject_text}</button>
                          <button className={styles.exam_name}>{item.exam_name}</button>
                        </div>
                        <div className={styles.user_name}>{item.user_name}发布</div>
                      </div>
                      <a className={styles.editor} onClick={ () => this.editor(index)}>编辑</a>
                    </List.Item>
                  )}
                />:<Empty />
              }
						</div>
					</Content>
				</div>
			</div>
		)
  }
  // 点击课程改变背景  获取课程类型id
  changeBg = (i) => {
    let msg = {...this.state.searchParams}
    msg.subject_id = this.props.subject_type[i].subject_id
    this.setState({
      activeIndex: i,
      searchParams: msg
    })
  }
  // 考试类型选择
  examSelect = (value) => {
    let msg = {...this.state.searchParams}
    msg.exam_id = this.props.exam_type.find(item => item.exam_name === value).exam_id
    this.setState({
      searchParams: msg
    })
  }
  // 题目类型选择
  topicSelect = (value) => {
    let msg = {...this.state.searchParams}
    msg.questions_type_id = this.props.topic_type.find(item => item.questions_type_text === value).questions_type_id
    this.setState({
      searchParams: msg
    })
  }
  // 查询筛选数据
  search = () => {
    // 筛选考试类型数据 
    let obj = {}
    Object.keys(this.state.searchParams).map(item => {
      if (this.state.searchParams[item]) {
        obj[item] = this.state.searchParams[item]
      }
    })  
    this.props.filtExamData(obj) 
  }
  // 试题详情
  goDetail = (i) => {
    let localData = JSON.parse(window.localStorage.getItem('data'))
    localData = this.props.listData[i]
    console.log(localData)
    window.localStorage.setItem('data',JSON.stringify(localData))
    this.props.history.push({
      pathname:'/home/testdetail'
    })
  }
  editor = (i) => {
    window.localStorage.setItem('data',JSON.stringify(this.props.listData[i]))
    this.props.history.push({pathname:'/home/editortest'})
  }
}

const mapState = (state) => {
  return {
    ...state.allexamtype,
    ...state.checktest
  }
}
const mapDispatch = (dispatch) => {
  return {
    // 获取所有考试类型
    getAllExamType () {
      dispatch({
        type:'allexamtype/getAllExamTypeAsync'
      })
    },
    // 获取所有的试题
    getAllQuestions () {
      dispatch({
        type: 'checktest/questionsAsync'
      })
    },
    // 筛选考试类型数据
    filtExamData (params) {
      dispatch({
        type:'checktest/filtExamDataAsync',
        value: params
      })
    }
  }
}
export default connect(mapState,mapDispatch)(CheckTest)
