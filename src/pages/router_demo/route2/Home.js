import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Home extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">主页</Link></li>
          <li><Link to="/about">关于</Link></li>
          <li><Link to="/person">个人中心</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
