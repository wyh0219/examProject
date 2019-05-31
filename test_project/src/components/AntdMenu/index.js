import React, {Component} from 'react'
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import menuData from '@/data'

const SubMenu = Menu.SubMenu;

class AntdMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {
          menuData.menuData.map(item => (
            <SubMenu
              key={item.parentId}
              title={<span><Icon type={item.icon} /><span>{item.menuTitle}</span></span>}
            >
              {item.subMenuList && item.subMenuList.length > 0 && item.subMenuList.map(val => (
                  <Menu.Item key={val.id}>
                    <Link to={val.path}>{val.name}</Link>
                  </Menu.Item>
              ))}
            </SubMenu>
          ))
        }
      </Menu>
    )
  }
}

export default AntdMenu
