import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import NavLeft from '@/components/NavLeft/NavLeft'
import Home from '@/pages/Home/Home'
import '@/style/common.less'

export default class App extends Component {
  render() {
    return (
      <div>
        <Row className="container">
          <Col span="3" className="nav-left">
            <NavLeft></NavLeft>
          </Col>
          <Col span="21" className="main">
            <Header></Header>
            <Row className="content">
              <Home></Home>
            </Row>
            <Footer></Footer>
          </Col>
        </Row>
      </div>
    )
  }
}
