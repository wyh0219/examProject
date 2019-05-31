import React , {Component} from 'react'

import styles from './style.less'
class Content extends Component {
  // props=['children']
  render(){
    let {children,title} = this.props
    return(
      <div>
        <div className={styles.header}>
        <h3>{title}</h3>
        </div>
        <div className={styles.wrap}>
          {children}
      </div>
      </div>
    )
    
  }
}
export default Content