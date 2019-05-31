import React, { Component } from 'react'
import {connect} from 'dva'
import {withRouter} from 'dva/router'
const mapStateToProps=(state)=>{
  return {
      ...state.examDetail,
      ...state.textList
  }
}
const mapDispatchToProps=dispatch=>{
  return {
      getdetail(){
        dispatch({
          type:'examDetail/getDetail'
        })
      },
      TextList(){
        dispatch({
            type:'textList/getTextList'
        })
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
@withRouter
 class Detail extends Component {
  componentDidMount(){
    this.props.getdetail()
    this.props.TextList()
  }
  render() {
    //console.log(this.props.location.query.id,"...........................")
    const examDetail=this.props.examList.find((v,i) =>{
      if(v.exam_exam_id === this.props.location.query.id){
        return v
      }
    })
    console.log(examDetail)
    return (
      <div>
        <h2>试卷详情</h2>
        <div>
          <h3>{examDetail.title}</h3>
          <div>
            {examDetail.subject_text}
          </div>
        </div> 
      </div>
    )
  }
}

export default Detail
