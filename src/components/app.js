import React, { Component } from 'react';
import NoticeListView from "./notice-segment";
import NoticeView from "./notice-view"
import { Header } from "semantic-ui-react";
import TabList from "./tab-list";
import notice_css from "../css/notice.css";
import { Route, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import GetNotices from "../actions/get_notices";
import GetNotice from "../actions/get_notice"
import {initial_page, search_keyword} from "../constants/constants";


const mapStateToProps = state => {
    return { notices: state, search: state.GetNotices.search_keyword };
};

const mapDispatchToProps = dispatch => {

  return {
    GetNotices: (page, search_keyword) => {
      dispatch(GetNotices(page, search_keyword))
    },
    GetNotice: (notice_id) => {
      dispatch(GetNotice(notice_id))
    },
  }
};

const get_id_from_notice_url = (url) => {
    let notice_id = +url.split('/')[3];
    return notice_id;
};


class App extends Component {

    componentDidMount () {
        console.log(this.props.location);

        if (this.props.location.pathname.startsWith('/noticeboard/notice/')) {
            let id = get_id_from_notice_url(this.props.location.pathname);
            this.props.GetNotice(id);
        } else {
            this.props.GetNotices(initial_page, search_keyword);
        }

        this.props.history.listen((location, action) => {

            if (location.pathname.startsWith('/noticeboard/notice/')) {
                let id = get_id_from_notice_url(location.pathname);
                this.props.GetNotice(id);
            } else {
                this.props.GetNotices(initial_page, search_keyword);
            }
        });
    }

    render () {

      return (
          <div>
              <div>
                  <Header as="h1" textAlign='center' block>NoticeBoard</Header>
              </div>

              <div styleName='notice_css.notice-container'>
                  <TabList/>
                  <Route exact path="/noticeboard"
                         render={(props) => <NoticeListView {...props} history={this.props.history}/>}
                   />
                  <Route path="/noticeboard/notice" component={NoticeView} />
              </div>
          </div>
      );
    }
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (App));
