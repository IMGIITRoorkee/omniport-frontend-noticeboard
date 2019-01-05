import React, { Component } from 'react';
import { connect } from 'react-redux'
import { isMobile, isBrowser } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'

import Sidebar from 'core/common/src/components/primary-sidebar'
import { AppHeader, AppFooter, AppMain, Tiles } from 'formula_one'
import {initial_page, search_keyword} from "../constants/constants";

import NoticeListView from "./notice-segment";
import NoticeView from "./notice-view"
import TabList from "./tab-list";
import { Route, withRouter } from "react-router-dom";
import GetNotices from "../actions/get_notices";
import GetNotice from "../actions/get_notice";

import main from 'formula_one/src/css/app.css'
import notice_css from "../css/notice.css";



const get_id_from_notice_url = (url) => {
    let notice_id = +url.split('/')[3];
    return notice_id;
};

class App extends React.PureComponent {

    componentDidMount () {

        if (this.props.location.pathname.startsWith('/noticeboard/notice/')) {
            let id = get_id_from_notice_url(this.props.location.pathname);
            this.props.GetNotice(id);
        } else {
            this.props.GetNotices(initial_page, search_keyword);
        }

        this.props.history.listen((location) => {

            console.log(location);
            if (location.pathname.startsWith('/noticeboard/notice/')) {
                let id = get_id_from_notice_url(location.pathname);
                this.props.GetNotice(id);
            } else {
                this.props.GetNotices(location.state.page, search_keyword);
            }
        });
    }

    render () {
        const { match } = this.props;
        const creators = [
      {
        name: 'Rhea Parekh',
        role: 'Backend and Frontend Developer',
        link: 'https://github.com/rheaparekh/'
      }
    ];

      return (
          <React.Fragment>
              <div styleName='main.app'>
                  <AppHeader appName='Noticeboard'
                             appLink={`http://${window.location.host}${match.path}`}
                             userDropdown/>
                  {isMobile && <Sidebar />}
                  <AppMain>
                      <div styleName='main.app-main'>
                          {isBrowser && <Sidebar />}
                          <Scrollbars autoHide>
                              <div styleName='notice_css.notice-container'>
                                  <TabList/>
                                  <Route exact path="/noticeboard"
                                         render={
                                             (props) => <NoticeListView {...props}
                                              history={this.props.history}/>}/>
                                  <Route path="/noticeboard/notice" component={NoticeView} />
                              </div>
                          </Scrollbars>
                      </div>
                  </AppMain>
                  <AppFooter creators={creators} />
              </div>
          </React.Fragment>
      )
    }
}

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

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (App));