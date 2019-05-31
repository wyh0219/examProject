import React,{Component} from 'react'
import {connect} from 'dva'
import {withRouter} from 'dva/router'
import Editor from 'for-editor'

import styles from './style.less'
 
import { Layout, Input, Select, Button } from 'antd';

const {
  Content
} = Layout

const Option = Select.Option;

@withRouter
class AddTest extends Component {
  componentDidMount () {
    this.props.getUserInfo()
    // 获取所有考试类型
    this.props.getAllExamType()
  }
  state = {
    addExam: {
      // 	试题的标题
      title: '',
      // 用户id
      user_id: '',
      // 考试id
      exam_id: '',
      // 	试题类型id
      questions_type_id: '',
      // 课程id
      subject_id: '',
      // 	题干
      questions_stem: '',
      // 题目答案
      questions_answer: '',
    }, 
    size: 'default',
  }
  render() {
    const { addExam } = this.state
    const { exam_type, subject_type, topic_type } = this.props
      return (
        <div className={styles.box}>
          <h3 className={styles.title}>添加试题</h3> 
          <div className={styles.content}>
            <Content>
              <div>
                <h3>题目信息</h3>
                <div className={styles.stem}>题干</div>
                {/* 收入标题 */}
                <div className={styles.input}>
                  <Input value={addExam.title} onChange={this.changeValue} className={styles.ipt_title} placeholder="请输入题目标题，不超过20个字" />
                </div>
                {/* 题目主题 */}
                <div className={styles.topic_theme}>
                  <h4>题目主题</h4>
                  <div className={styles.level_title}>
                    <div className={styles.editor}>
                      <Editor value={addExam.questions_stem} onChange={this.handleTopic.bind(this)} />
                    </div>
                  </div>
                </div>
                {/* 选择试题类型 */}
                <div className={styles.choose_type}>
                  {/* 考试类型 */}
                  <div className={styles.exam_type}>
                    <div className={styles.choose_exam}>
                      <label>请选择考试类型:</label>
                    </div>
                    <div className={styles.exam_select}>
                      <Select defaultValue={this.props.exam_type[0] ? this.props.exam_type[0].exam_name : null} style={{ width: 200 }} onChange={this.examSelect}>
                        {exam_type.map((item) => <Option key={item.exam_id} value={item.exam_name}>{item.exam_name}</Option> )}
                      </Select>
                    </div>
                  </div>
                  {/* 选择课程类型 */}
                  <div className={styles.subject_type}>
                    <div className={styles.choose_subject}>
                      <label>请选择课程类型:</label>
                    </div>
                    <div className={styles.subject_select}>
                    <Select
                      size={this.state.size}
                      defaultValue={this.props.subject_type[0] ? this.props.subject_type[0].subject_text : 'javaScript上'} 
                      onChange={ this.subjectSelect}
                      style={{ width: 200 }}
                    >
                      {subject_type.map((item) => <Option value={item.subject_text} key={item.subject_id}>{item.subject_text}</Option> )}
                    </Select>
                    </div>
                  </div>
                  {/* 选择题目类型 */}
                  <div className={styles.topic_type}>
                    <div className={styles.choose_topic}>
                      <label>请选择题目类型:</label>
                    </div>
                    <div className={styles.topic_select}>
                      <Select defaultValue={this.props.topic_type[0] ? this.props.topic_type[0].questions_type_text : null} style={{ width: 200 }} onChange={this.topicSelect}>
                        {topic_type.map((item) => <Option value={item.questions_type_text} key={item.questions_type_id}>{item.questions_type_text}</Option> )}
                      </Select>
                    </div>
                  </div>
                </div>
                {/* 答案信息 */}
                <div className={styles.answer_infor}>
                  <div className={styles.topic_theme}>
                    <h4>答案信息</h4>
                    <div className={styles.level_title}>
                      <div className={styles.editor}>
                        <Editor value={addExam.questions_answer} onChange={this.handleAnswer.bind(this)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.submit}>
                  <Button type="提交" onClick={this.addExam}>提交</Button>
                </div>
              </div>
            </Content>
          </div>
        </div>
    );
  }
  // 获取标题
  changeValue = (e) => {
    let addExam = {...this.state.addExam}
    addExam.title = e.target.value
    this.setState({
      addExam
    })
  }
  // 获取题目信息
  handleTopic = (value) => {
    let addExam = {...this.state.addExam}
    addExam.questions_stem = value
    this.setState({
      addExam
    })
  }
  // 选择考试  周考一
  examSelect = (value) => {
    let addExam = {...this.state.addExam}
    addExam.exam_id = this.props.exam_type.find(item => item.exam_name === value).exam_id
    this.setState({
      addExam
    })
  }
  // 选择课程
  subjectSelect = (value) => {
    let addExam = {...this.state.addExam}
    addExam.subject_id = this.props.subject_type.find(item => item.subject_text === value).subject_id
    this.setState({
      addExam
    })
  }
  // 选择题目类型
  topicSelect = (value) => {
    let addExam = {...this.state.addExam}
    addExam.questions_type_id = this.props.topic_type.find(item => item.questions_type_text === value).questions_type_id
    this.setState({
      addExam
    })
  }
  // 输入答案
  handleAnswer = (value) => {
    let addExam = {...this.state.addExam}
    addExam.questions_answer = value
    this.setState({
      addExam
    })
  }
  // 添加试题
  addExam = () => {
    let msg = {...this.state.addExam}
    msg.user_id = this.props.user_id
    if (!msg.exam_id ) {
      msg.exam_id = this.props.exam_type[0].exam_id
    }
    if (!msg.subject_id) {
      msg.subject_id = this.props.subject_type[0].subject_id
    }
    if (!msg.questions_type_id) {
      msg.questions_type_id = this.props.topic_type[0].questions_type_id
    }
    this.setState({
      addExam: msg
    }, () => {
      // 添加试题
      this.props.addExam(this.state.addExam)
    })
  }
}

const mapState = (state) => {
  return {
    ...state.allexamtype,
    ...state.addtest
  }
}
const mapDispatch = (dispatch) => {
  return {
    getUserInfo () {
      dispatch({
        type:'addtest/fetUserInfoAsync'
      })
    },
    // 获取所有考试类型
    getAllExamType () {
      dispatch({
        type:'allexamtype/getAllExamTypeAsync'
      })
    },
    // 添加试题
    addExam (params) {
      dispatch({
        type: 'addtest/addExamAsync',
        value: params
      })
    }
  }
}
export default connect(mapState,mapDispatch)(AddTest);