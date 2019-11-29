import React, { Component } from 'react'
import { Row, Col } from "antd";
import './Header.less'
import { formateDate } from '@/utils/utils'
import axios from '@/axios/index.js'

export default class Header extends Component {

  UNSAFE_componentWillMount() {
    this.setState({
      userName: '王鹤鹏'
    })
    setInterval(() => {
      let sysTime = formateDate(new Date());
      this.setState({
        sysTime
      })
    }, 1000);
    this.getWeatherApiData();
  }

  getWeatherApiData() {
    let city = '北京'
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then(res => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0];
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })
  }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span="24">
            <span style={{ marginRight: 20 }}>欢迎，{this.state.userName}</span>
            <a href="/">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span="4" className="breadcrumb-title">
            首页
          </Col>
          <Col span="20" className="weater">
            <span className="weater-data">{this.state.sysTime}</span>
            <span className="weater-detail">
              <img style={{ width: 30, height: 24, marginRight: 5 }} src={this.state.dayPictureUrl} alt=""></img>
              <span>{this.state.weather}</span>
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}
