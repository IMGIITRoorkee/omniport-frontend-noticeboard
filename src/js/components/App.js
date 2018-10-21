import React, { Component } from 'react';
import NoticeList from "./notice-segment";
import { Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";
import TabList from "./tab-list";
import "../../css/notice.css"


export default class App extends Component {
    render () {
      return (
          <div className="App">
              <div className="App-header">
                  <Header as="h1" textAlign='center' block>NoticeBoard</Header>
              </div>
              <div className='notice-container'>
                  <TabList/>
                  <NoticeList/>
              </div>
          </div>
      );
    }
}
