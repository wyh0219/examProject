import React,{Component} from 'react'
import { Layout } from 'antd';
import ReactMarkdown from 'react-markdown'

import styles from './style.less'

const {
  Content
} = Layout;


class TestDetail extends Component {
  state = { 
    detail: window.localStorage.getItem('data') ? JSON.parse(window.localStorage.getItem('data')) : null
  }
  componentDidlMount () {
   
  }
  render() {
    const {detail} = this.state
    return (
      <div className={styles.box}>
        <h3 className={styles.title}>试题详情</h3>
        <Content>
          {
            detail ? <div className={styles.content}>
                        <div className={styles.left}>
                          {/* 出题人 */}
                          <div className={styles.user_name}>出题人：{detail.user_name}</div>
                          <div className={styles.detail_cont}>
                            <h3>题目信息</h3>
                            <div className={styles.all_btn}>
                              <button className={styles.questions_type}>{detail.questions_type_text}</button>
                              <button className={styles.subject_text}>{detail.subject_text}</button>
                              <button className={styles.exam_name}>{detail.exam_name}</button>
                            </div>
                            <div className={styles.stem}>
                              <label>{detail.title}</label>
                              <div className={styles.questions_stem}>
                                <ReactMarkdown source={detail.questions_stem} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.right}>
                          <h3>答案信息</h3>
                          <div className={styles.questions_answer}>
                            <ReactMarkdown source={detail.questions_answer} />
                          </div>
                        </div>
                    </div> : '暂无数据'
          }
        </Content>
      </div> 
    )
  }
}


export default TestDetail
