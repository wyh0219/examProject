import dva from 'dva';
import './index.css';
import api from "./api"

// 1. Initialize
export const app = dva(); 

app.api = api

// 2. Plugins
// app.use(
  
// );

// 3. Model
 app.model(require('./models/examination/addExam/getExam').default);
 app.model(require('./models/examination/gongong/index').default);
 app.model(require('./models/examination/TextList/TextList').default);
 app.model(require('./models/examination/examDetail/examDetail').default);
 app.model(require('./models/examination/delete/delete').default);
 
 
// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root');
