import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class About extends Component {
  render() {
    return (
      <div>
        这是关于页面
        <Link to="/about/a">嵌套路由</Link>
        <hr />
        {this.props.children}
      </div>
    )
  }
}
