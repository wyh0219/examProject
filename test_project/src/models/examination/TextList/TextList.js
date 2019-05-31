import {app} from '@/index'
import {Link} from 'dva/router'
const colums =[{
  title:'试卷',
  dataIndex: 'title',
  key: 'title'
},{
  title:'班级',
  dataIndex: 'grade_name',
  key: 'grade_name'
},{
  title:'创建人',
  dataIndex: 'user_name',
  key: 'user_name'
},{
  title:'开始时间',
  dataIndex: 'start_time',
  key: 'start_time'
},{
  title:'结束时间',
  dataIndex: 'end_time',
  key: 'end_time'
},{
  title:'操作',
  key: 'action',
  render: (text, index) => (
    <Link to={{pathname:'/home/examdetail',query: {id:text.exam_exam_id}}}>
     详情
    </Link>
  )
}]
export default {

  namespace: 'textList',

  state: {
    examList:[],
    columns:colums
  },

  reducers: {
    TextList (state, payload) {
      return {
        ...state,
        examList: payload.value
      }
    }
  },

  effects: {
    *getTextList(action,{call, put }) { //获取课程类型
      const data = yield app.api.exam.examList()
      yield put({type:'TextList', value: data.exam})
    }
  },

};
