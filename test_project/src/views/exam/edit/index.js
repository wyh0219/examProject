import React, { Component } from 'react'
import {connect} from 'dva'
import styles from './style.less'
const mapStateToProps=(state)=>{
  console.log(state,"................state")
  return {
      ...state.delete,
      ...state.getExam.createTest
  }
}
const mapDispatchToProps=dispatch=>{
  return {
      deleteExam(){
        dispatch({
          type:'delete/deleteExam'
        })
      }
  }
}

@connect(mapStateToProps, mapDispatchToProps) //装饰器语法
 class Edit extends Component {
  componentDidMount(){
  }
  dele=()=>{
    this.props.deleteExam()
  }
  render() {
    console.log(this.props.questions,'...this.props')
    
    return (
      <div>
          <h2>创建试卷</h2>
          <div className={styles.content}>
            <div><span onClick={this.dele}>删除</span></div>
            <h3>{this.props.title}</h3>
            <p>考试开始时间{this.props.start_time}</p>
            {/* <div>{
              this.props.questions.map((item,index) => {
              return <p key={index}>{item.title}</p>
              })
            }</div> */}
          </div>
      </div>
    )
  }
}
export default Edit