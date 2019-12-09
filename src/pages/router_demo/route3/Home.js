import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Home extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/main">主页</Link></li>
          <li><Link to="/a">a</Link></li>
          <li><Link to="/b">b</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
