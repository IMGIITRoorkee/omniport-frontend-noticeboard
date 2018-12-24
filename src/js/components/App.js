import React, { Component } from 'react';
import NoticeListView from "./notice-segment";
import NoticeView from "./notice-view"
import { Header, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";
import TabList from "./tab-list";
import "../../css/notice.css";
import { Route, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import GetNotices from "../actions";


const mapStateToProps = state => {
    return { notices: state };
};

const mapDispatchToProps = dispatch => {
  return {
    GetNotices: () => {
      dispatch(GetNotices(1))
    }
  }
};


class App extends Component {

    componentDidMount () {
        this.props.GetNotices();
    }

    render () {

      return (
          <div className="App">
              <div className="App-header">
                  <Header as="h1" textAlign='center' block>NoticeBoard</Header>
              </div>

              <div className='notice-container'>
                  <TabList/>
                  <Route exact path="/"
                         render={(props) => <NoticeListView {...props}/>}
                   />
                  <Route exact path="/notice" component={NoticeView} />
              </div>
          </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(App));
