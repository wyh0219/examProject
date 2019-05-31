import React,{Component} from 'react'
import {connect} from 'dva'
import Editor from 'for-editor'

import styles from './style.less'
 
import { Layout, Input, Select, Button } from 'antd'

const {
  Content
} = Layout

const Option = Select.Option;

const editorData = window.localStorage.getItem('data') ? JSON.parse(window.localStorage.getItem('data')) : null


class EditorTest extends Component {
  componentDidMount () {
    // 获取所有考试类型
    this.props.getAllExamType()
  }
  state = {
    addExam: {
      // 	试题的标题
      title: editorData.title,
      // 用户id
      user_id: editorData.user_id,
      // 考试id
      exam_id: editorData.exam_id,
      // 	试题类型id
      questions_type_id: editorData.questions_type_id,
      // 课程id
      subject_id: editorData.subject_id,
      // 	题干
      questions_stem: editorData.questions_stem,
      // 题目答案
      questions_answer: editorData.questions_answer,
    }, 
    size: 'default',
  }
  render() {
    const { exam_type, subject_type, topic_type } = this.props
      return (
        <div className={styles.box}>
          <h3 className={styles.title}>编辑试题</h3> 
          <div className={styles.content}>
            <Content>
              <div>
                <h3>题目信息</h3>
                <div className={styles.stem}>题干</div>
                {/* 收入标题 */}
                <div className={styles.input}>
                  <Input value={editorData.title} onChange={this.changeValue} className={styles.ipt_title} placeholder="请输入题目标题，不超过20个字" />
                </div>
                {/* 题目主题 */}
                <div className={styles.topic_theme}>
                  <h4>题目主题</h4>
                  <div className={styles.level_title}>
                    <div className={styles.editor}>
                      <Editor value={editorData.questions_stem} onChange={this.handleTopic.bind(this)} />
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
                      <Select defaultValue={editorData.exam_name} style={{ width: 200 }} onChange={this.examSelect}>
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
                      defaultValue={editorData.subject_text}
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
                      <Select defaultValue={editorData.questions_type_text} style={{ width: 200 }} onChange={this.topicSelect}>
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
                        <Editor value={editorData.questions_answer} onChange={this.handleAnswer.bind(this)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.submit}>
                  <Button type="提交" onClick={this.updateExam}>提交</Button>
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
  // 更新试题
  updateExam = () => {
    this.props.updateExam(this.state.addExam)
  }
}

const mapState = (state) => {
  return {
    ...state.allexamtype,
    ...state.addtest,
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
    // 更新试题
    updateExam (params) {
      dispatch({
        type: 'editortest/updateExam',
        value: params
      })
    }
  }
}
export default connect(mapState,mapDispatch)(EditorTest);