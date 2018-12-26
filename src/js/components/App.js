import React, { Component } from 'react';
import NoticeListView from "./notice-segment";
import NoticeView from "./notice-view"
import { Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";
import TabList from "./tab-list";
import "../../css/notice.css";
import { Route, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import GetNotices from "../actions";
import {initial_page} from "../constants/constants";


const mapStateToProps = state => {
    return { notices: state };
};

const mapDispatchToProps = dispatch => {

  return {
    GetNotices: (page) => {
      dispatch(GetNotices(page))
    }
  }
};


class App extends Component {

    componentDidMount () {
        this.props.GetNotices(initial_page);
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage });

    render () {

      return (
          <div className="App">
              <div className="App-header">
                  <Header as="h1" textAlign='center' block>NoticeBoard</Header>
              </div>

              <div className='notice-container'>
                  <TabList/>
                  <Route exact path="/"
                         method={this.handlePaginationChange}
                         render={(props) => <NoticeListView {...props}/>}
                   />
                  <Route exact path="/notice" component={NoticeView} />
              </div>
          </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(App));
