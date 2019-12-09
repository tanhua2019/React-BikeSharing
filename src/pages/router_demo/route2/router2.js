import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Main from '../route1/Main'
import About from '../route1/About'
import Person from '../route1/Person'

import Home from './Home'
// as 起别名
export default class router2 extends Component {
  render() {
    return (
      <div>
        <Router>
          <Home>
            <Route path="/" exact render={() => <Main>这是main子组建</Main>}></Route>
            <Route path="/about" render={() =>
              <About>
                <Route path="/about/a" component={Person}></Route>
              </About>
            }></Route>
            <Route path="/person" component={Person}></Route>
          </Home>
        </Router>
      </div>
    )
  }
}
