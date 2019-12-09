import React, { Component } from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import Main from './Main'
import About from './About'
import Person from './Person'

export default class Home extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul>
            <li><Link to="/">主页</Link></li>
            <li><Link to="/about">关于</Link></li>
            <li><Link to="/person">个人中心</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact component={Main}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/person" component={Person}></Route>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}
