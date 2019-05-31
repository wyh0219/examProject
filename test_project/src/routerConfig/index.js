import dynamic from 'dva/dynamic'
import {app} from '@/index'

const LoadComponent = ( models, component) => {
	  return dynamic({
      app,
      models: () => models.map(item => import(`@/models${item}`)),
      component: component
	  })
  
}

export default  {
	routes: [
		{
      path:"/login",
      name:'登录',
      component:LoadComponent( ['/login/login'], () => import('@/layout/LoginLayout'))
		},
		{
      path:"/home",
      name:'首页',
      component:LoadComponent( ['/test/TestClassify'], () => import('@/layout/BaseLayout')),
      children:[
        {
          path:"/home/chart",
          name:'图表统计',
          component:LoadComponent( ['/test/AddTest'],() => import('@/views/chart'))
        },
        {
          path:"/home/addtest",
          name:'添加试题',
          component:LoadComponent( ['/test/AddTest','/test/CommonTest'],() => import('@/views/test/AddTest'))
        },
        {
          path:"/home/classifytest",
          name:'试题分类',
          component:LoadComponent( ['/test/TestClassify'], () => import('@/views/test/ClassifyTest'))
        },
        {
          path:"/home/checktest",
          name:'查看试题',
          component:LoadComponent( ['/test/CheckTest','/test/CommonTest'],() => import('@/views/test/CheckTest'))
        },
        {
          path:"/home/editortest",
          name:'编辑试题',
          component:LoadComponent( ['/test/EditorTest','/test/CommonTest'],() => import('@/views/test/EditorTest'))
        },
        {
          path:"/home/testdetail",
          name:'试题详情',
          component:LoadComponent( ['/test/AddTest'],() => import('@/views/test/TestDetail'))
        },
        {
          path:"/home/adduser",
          name:'添加用户',
          component:LoadComponent( ['/user/Adduser', '/user/Updatauser'],() => import('@/views/user/AddUser'))
        },
        {
          path:"/home/userrole",
          name:'用户展示',
          component:LoadComponent( ['/user/UserRole'],() => import('@/views/user/UserRole'))
        },
        {
          path:"/home/class",
          name:'班级管理',
          component:LoadComponent( ['/class/class'],() => import('@/views/class/Class'))
        },
        {
          path:"/home/classroom",
          name:'教室管理',
          component:LoadComponent( ['/class/classRoom'],() => import('@/views/class/ClassRoom'))
        },
        {
          path:"/home/student",
          name:'学生管理',
          component:LoadComponent( ['/class/student'],() => import('@/views/class/Student'))
        },
        {
          path:"/home/addexam",
          name:'添加考试',
          component:LoadComponent( ['/test/TestClassify'],() => import('@/views/exam/AddExam'))
        },
        {
          path:"/home/examlist",
          name:'试题列表',
          component:LoadComponent( ['/test/TestClassify'],() => import('@/views/exam/ExamList'))
        },
        {
          path:"/home/mark",
          name:'待批班级',
          component:LoadComponent( ['/test/TestClassify'],() => import('@/views/correct/CorrectTest'))
        }
      ]
		}
	]
}