import React, { Component } from 'react';
import NoticeListView from "./notice-segment";
import NoticeView from "./notice-view"
import { Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";
import TabList from "./tab-list";
import "../../css/notice.css";
import { Route, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import GetNotices from "../actions/get_notices";
import GetNotice from "../actions/get_notice"
import {initial_page} from "../constants/constants";


const mapStateToProps = state => {
    return { notices: state };
};

const mapDispatchToProps = dispatch => {

  return {
    GetNotices: (page) => {
      dispatch(GetNotices(page))
    },
    GetNotice: (notice_id) => {
      dispatch(GetNotice(notice_id))
    },
  }
};

const get_id_from_notice_url = (url) => {
    let id = +url.split('/')[2];
    return id;
};


class App extends Component {

    componentDidMount () {
        if (this.props.location.pathname.startsWith('/notice/')) {
            let id = get_id_from_notice_url(this.props.location.pathname);
            this.props.GetNotice(id);
        } else {
            this.props.GetNotices(initial_page);
        }

        this.unlisten = this.props.history.listen((location, action) => {
            if (location.pathname.startsWith('/notice/')) {
                let id = get_id_from_notice_url(location.pathname);
                this.props.GetNotice(id);
            } else {
                this.props.GetNotices(initial_page);
            }
        });
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
                         render={(props) => <NoticeListView {...props} history={this.props.history}/>}
                   />
                  <Route path="/notice" component={NoticeView} />
              </div>
          </div>
      );
    }
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (App));
