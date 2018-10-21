import React, { Component } from 'react';
import NoticeListView from "./notice-segment";
import NoticeView from "./notice-view"
import { Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";
import TabList from "./tab-list";
import "../../css/notice.css";
import { Route} from "react-router-dom";


export default class App extends Component {
    render () {
      return (
          <div className="App">
              <div className="App-header">
                  <Header as="h1" textAlign='center' block>NoticeBoard</Header>
              </div>
              <div className='notice-container'>
                  <TabList/>
                  <Route exact path="/" component={NoticeListView} />
                  <Route exact path="/notice" component={NoticeView} />
              </div>
          </div>
      );
    }
}
