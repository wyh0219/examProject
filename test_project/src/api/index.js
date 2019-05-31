import {get, post ,put,del} from '../utils/axios';

const api = {

/**
 * 登录
 */ 
  login: {
    //登录接口
    login: (data) => post('/user/login',{
      user_name:data.user_name,
      user_pwd:data.user_pwd
    })
  },
  
/**
 * 用户
 */
  user: {
    //添加用户
    addUser: (data) => post('/user',{
      user_name:data.user_name,
      user_pwd:data.user_pwd,
      identity_id:data.identity_id
    }),
     //展示用户数据
    userList: () => get('/user/user'),
    //获取当前用户信息
    userInfo: () => get('/user/userInfo'),
    //更新用户信息(用户名，用户密码，用户身份)
    updateUser: (data) => put('/user/user',{
      user_id: data.user_id,
      user_name: data.user_name,
      user_pwd: data.user_pwd,
      identity_id: data.identity_id
    }),
    //获取下拉选项数据
    GetSelectData: () => get('/user/identity')
  },

  /**
 * 学生 班级 教室
 */
  class: {
    //班级列表
    classList: () => get('/manger/grade'),
    //全部教室
    roomList: () =>  get('/manger/room'),
    //获取没有分配教室的班级
    newGrade: ()=> get('/manger/grade/new'),
    //获取已经分配教室的班级的接口
    grade: ()=> get('/manger/grade'),
    //删除班级
    deleteGrade: (data) => del('/manger/grade/delete',{
      data:{
        grade_id:data.grade_id
      }
    }),
    //更新班级
    updateGrade: (data)=> put('/manger/grade/update',{
      grade_id: data.grade_id,
      grade_name: data.grade_name,
      subject_id : data.subject_id,
      room_id: data.room_id
    }),
    //添加班级
    addGrade: (data)=> post('/manger/grade',{
      grade_name: data.grade_name,
      room_id:data.room_id,
      subject_id: data.subject_id
    }),
   //获取所有没有分班的学生
    newStudent: ()=> get('/manger/student/new'),
    //获取已经分班学生接口
    student: ()=> get('/manger/student'),
    //更新学生信息接口
    updateStudent: (data)=> put('/manger/student/edit',{
      student_id: data.student_id,
      student_name: data.student_name,
      student_pwd: data.student_pwd,
      grade_id: data.grade_id
    }),
    //添加学生接口
    addStudent: (data)=> post('/manger/student',{
      student_id: data.student_id,
      student_name: data.student_name,
      student_pwd: data.student_pwd,
      grade_id: data.grade_id
    }),
    //更新教室
    updateRoom: (data) => put('/manger/room/update',{
      room_id: data.room_id,
      room_text: data.room_text
    }),
    // 删除教室
    delRoom: (data) => del('/manger/room/delete',{
      data:{
        room_id:data.room_id
      }
    }),
    //添加教室
    addRoom: (data) => post('/manger/room',{
      room_text:data.room_text
    }),
    //删除学生
    delStudent: (data) => del(`/manger/student/${data.student_id}`),
  },

  /**
 * 试题
 */
  test: {
    //添加试题
    addTest: (data) => post('/exam/questions',{
      questions_type_id: data.questions_type_id,
      questions_stem: data.questions_stem,
      subject_id: data.subject_id,
      exam_id: data.exam_id,
      user_id: data.user_id,
      questions_answer: data.questions_answer,
      title: data.title
    }),
    // 获取所有试题
    allTest: () => get('/exam/questions/new'),
    //更新试题
    updateTest: (data) => put('/exam/questions/update',data),
    //获取所有考试类型
    examType: () => get('/exam/examType'),
    //获取所有的课程
    subject: () => get('/exam/subject'),
    //删除指定的试题类型
    delQuestionsTyle: (data) => post('/exam/delQuestionsType',data),
    //添加试题类型
    insertQuestionsType: (data) => get('/exam/insertQuestionsType',{params:data}),
    //获取所有的试题类型
    getQuestionsType: ()=> get('/exam/getQuestionsType'),
    //按条件获取试题
    condition: (data)=> get('/exam/questions/condition', {
      params: data
    })
  },

/**
 * 考试
 */
  exam: {
    //创建试卷
    addExam: (data)=>post('/exam/exam',data),
    //更新试卷
    updateExam: (data) => put('/exam/exam/w5tcy-g2dts',{
      question_ids: data.question_ids
    }),
    //获取试卷列表接口
    examList: (data) =>get('/exam/exam'),
    //获取试卷详情（教师端）接口
    teacherExamDetail: ()=> get('/exam/exam/w5tcy-g2dts'),
    //删除试卷接口
    deleteExam: ()=> del('/exam/exam/w5tcy-g2dts')
  },

/**
 * 试卷
 */
  correct: {
    //获取学生试卷列表接口
    student: () => get('/exam/student')
  }
}
export default api
