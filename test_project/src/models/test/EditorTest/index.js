import {app} from '@/index'

export default {
  namespace: 'editortest',
  state : {

  },
  effects: {
    *updateExam (action) {
      const res =  yield app.api.test.updateTest(action.value)
      console.log(res)
    }
  }
}
