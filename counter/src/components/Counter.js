/** @format */

import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components";
import "./ScssCounter.scss";

const boxBackground = keyframes`
0%{
  background-position : 0 50%;
}
50%{
  background-position : 50% 50%;
}
100%{
  background-position : 0% 50%;
}
`;

const PercentBoxContainer = styled.div`
  width: 80%;
  border-radius: 5px;
  border: 2px solid #123456;
  margin: 0px 10%;
`;

const PercentBox = styled.div`
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a605, #23d5a8);
  background-size: 400% 400%;
  height: 30px;
  width: ${(props) => props.width + "%" || "100%"};
  animation: ${boxBackground} 10s ease-in-out infinite;
  position: relative;
`;

class Counter extends Component {
  state = {
    startTime: new Date(),
    endTime: new Date(),
    curTime: new Date(),
    leftMinute: 0,
    isEnd: false,
  };
  updateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    let startTime = new Date(year, month, date, 8, 0);
    let endTime = new Date(year, month, date, 17, 30);
    let percent = 100;
    let leftMinute = 0;
    let isEnd = false;
    if (startTime <= now && now <= endTime) {
      percent = (now - startTime) / (endTime - startTime);
      //console.log(percent);
      percent = Math.floor(percent * 100000) / 1000;
      percent = percent.toFixed(3);
      leftMinute = (endTime.getTime() - now.getTime()) / 1000 / 60;
      leftMinute = Math.floor(leftMinute);
    } else {
      isEnd = true;
    }
    console.log(`${now.getFullYear()} ${month} ${date}`);
    this.setState({
      startTime: startTime,
      endTime: endTime,
      curTime: new Date(),
      percent: percent,
      leftMinute: leftMinute,
      isEnd: isEnd,
    });
  }
  componentDidMount() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }
  render() {
    return (
      <div>
        <div id="curTime">
          현재 시각 : {this.state.curTime.toLocaleTimeString()}
        </div>
        <div>남은 시간 : {this.state.leftMinute}분</div>

        <div>업무 시작 : {this.state.startTime.toLocaleString()}</div>
        <div>업무 종료 : {this.state.endTime.toLocaleString()}</div>

        <PercentBoxContainer>
          <PercentBox width={this.state.percent}></PercentBox>
        </PercentBoxContainer>
        <div className="percentValue">{this.state.percent}%</div>
        {this.state.isEnd && <div>내일도 힘내서 근무합시다!</div>}
      </div>
    );
  }
}

export default Counter;
