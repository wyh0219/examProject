export default {
  menuData: [
    {
      menuTitle: '成绩统计',
      icon: 'pie-chart',
      parentId:33,
      subMenuList: [{
        id: 43,
        name: '图表',
        path:"/home/chart"
      }]
    },
    {
      menuTitle: '试题管理',
      icon: 'form',
      parentId: 0,
      subMenuList: [{
        id: 1,
        name: '添加试题',
        path:"/home/addtest"
      },{
        id: 2,
        name: '试题分类',
        path:"/home/classifytest"
      },{
        id:3,
        name: '查看试题',
        path:"/home/checktest"
      }]
    },
    {
      menuTitle: '用户管理',
      icon: 'form',
      parentId: 4,
      subMenuList: [{
        id:5,
        name: '添加用户',
        path:"/home/adduser",
      },{
        id:6,
        name: '用户展示',
        path:"/home/userrole",
      }]
    },
    {
      menuTitle: '班级管理',
      icon: 'table',
      parentId: 8,
      subMenuList: [{
        id:9,
        name: '班级管理',
        path:"/home/class",
      },{
        id:10,
        name: '教室管理',
        path:"/home/classroom",
      },{
        id:11,
        name: '学生管理',
        path:"/home/student",
      }]
    },
    {
      menuTitle: '考试管理',
      subMenuList:[{
        id:18,
        name:'添加考试',
        path:'/home/addexam',
      },{
        id:19,
        name:'试卷列表',
        path:'/home/examlist',
      }],
      icon: 'check-circle',
      parentId: 16,
      path:"",
    },
    {
      parentId: 17,
      menuTitle: '阅卷管理',
      subMenuList:[{
        id:20,
        name:'待批班级',
        path:'/home/mark',
      }],
      icon: 'project',
      path:"",
    }
  ]
}