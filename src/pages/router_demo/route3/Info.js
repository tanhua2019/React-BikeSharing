import React, { Component } from 'react'

export default class Info extends Component {
  render() {
    return (
      <div>
        {this.props.match.params.value}
      </div>
    )
  }
}

