import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main'
import Info from './Info'
import Error from './Error'
import Home from './Home'
// as 起别名
export default class router2 extends Component {
  render() {
    return (
      <div>
        <Router>
          <Home>
            <Switch>
              <Route path="/main" render={() =>
                <Main>
                  <Route path="/main/:value" component={Info}></Route>
                </Main>
              }></Route>
              <Route component={Error}></Route>
            </Switch>
          </Home>
        </Router>
      </div>
    )
  }
}
