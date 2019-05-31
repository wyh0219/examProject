import React, {Component} from 'react'
import { Layout } from 'antd';

import styles from './style.less'
import {withRouter} from 'dva/router'
import {message} from 'antd'
// 组件引入
import MapRoute from '@/routerConfig/routerEnter'
import AntdMenu from '@/components/AntdMenu'

const { Sider, Content } = Layout; 
@withRouter
class IndexPage extends Component {
  componentDidMount () {
    const token = localStorage.getItem('token')
    if (!token) {
      message.error('请您先登录！')
      this.props.history.push('/login')
    }
  }
  render() {
    return (
        <div className="box">
          <div className={styles.header}>
            <header>
              <img 
              src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg' 
              className={styles.logo} 
              alt="" />
            </header>
          </div>
          <Layout>
            <div className={styles.sider}>
              <Sider width={240} style={{ minHeight: '100vh' }}>
                <AntdMenu />
              </Sider>
            </div>
            <div className={styles.right_cont}>
              <Layout>
                <Content style={{ margin: '0px 16px 0' }}>
                    <MapRoute routes={this.props.routes}></MapRoute>
                </Content>
              </Layout>
            </div>
          </Layout>
        </div>
    )
  }
}
export default IndexPage;
