import React, { Component } from 'react'
import MenuConfig from '@/config/menuConfig'
import { Menu } from 'antd';
import './NavLeft.less'
const SubMenu = Menu.SubMenu;


export default class NavLeft extends Component {

 UNSAFE_componentWillMount () {
    const menuTree = this.menu(MenuConfig)
    this.setState({
      menuTree
    })
  }

  menu = (data) => {
    return data.map(item => {
      if (item.children) {
        return <SubMenu title={item.title} key={item.key}>{this.menu(item.children)}</SubMenu>
      }
      return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
    })
  }
  
  render() {
    return (
      <div>
        <div className="logo">
          <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png" alt="" />
        </div>
        <Menu theme='dark'>
          {this.state.menuTree}
        </Menu>
      </div>
    )
  }
}
