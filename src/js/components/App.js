import React, { Component } from 'react';
import NoticeListView from "./notice-segment";
import NoticeView from "./notice-view"
import { Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";
import TabList from "./tab-list";
import "../../css/notice.css";
import { Route, withRouter } from "react-router-dom";


class App extends Component {
    render () {

        const notices = [
            {id : 1, title: "Unit Info", time: "8:00 PM", date: "today", banner: "DOSW"},
            {id : 2, title: "Schedule of company", time: "7:30 PM", date: "Sept 18", banner: "Placement office"},
            {id : 3, title: "Guest Lecture on Plasma", time: "11:00 AM", date: "Oct 19", banner: "Physics"},
            {id : 4, title: "Blood donation camp", time: "8:00 PM", date: "Yesterday", banner: "NSS"},
            {id : 5, title: "Unit Info", time: "8:00 PM", date: "today", banner: "Academic Section"},
            {id : 6, title: "Call for interviews", time: "8:00 PM", date: "today", banner: "Dean SRIC"},
            {id : 7, title: "Scholarship openings", time: "8:00 PM", date: "today", banner: "Scholarship"},
            {id : 8, title: "Scholarship openings", time: "8:00 PM", date: "today", banner: "Scholarship"},
            {id : 9, title: "Scholarship", time: "4:00 PM", date: "today", banner: "Department"},
            {id : 10, title: "Scholarship openings", time: "8:00 PM", date: "today", banner: "Scholarship"},
        ];

      return (
          <div className="App">
              <div className="App-header">
                  <Header as="h1" textAlign='center' block>NoticeBoard</Header>
              </div>

              <div className='notice-container'>
                  <TabList/>
                  <Route exact path="/"
                         render={(props) => <NoticeListView {...props} notices={notices} />}
                   />
                  <Route exact path="/notice" component={NoticeView} />
              </div>
          </div>
      );
    }
}

export default withRouter(App);
