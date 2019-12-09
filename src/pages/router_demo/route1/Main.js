import React, { Component } from 'react'

export default class Main extends Component {
  render() {
    return (
      <div>
        这是主页
        <hr />
        {this.props.children}
      </div>
    )
  }
}
