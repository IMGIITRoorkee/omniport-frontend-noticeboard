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
import SideNav from "./sidenav"
import { Route, withRouter } from "react-router-dom";
import GetNotices from "../actions/get_notices";
import GetNotice from "../actions/get_notice";
import GetFilters from "../actions/filters";

import main from 'formula_one/src/css/app.css'
import notice_css from "../css/notice.css";



const get_id_from_notice_url = (url, expired) => {
    let notice_id;
    if (!expired){
        notice_id = +url.split('/')[3];
    } else {
        notice_id = +url.split('/')[4];
    }
    return notice_id;
};

class App extends React.PureComponent {

    componentDidMount () {

        this.props.GetFilters();

        // Direct url hit
        if (this.props.location.pathname.startsWith('/noticeboard/notice/')) {
            if (this.props.location.pathname.startsWith('/noticeboard/notice/old/')) {
                let id = get_id_from_notice_url(this.props.location.pathname, true);
                this.props.GetNotice(id, true);
            } else {
                let id = get_id_from_notice_url(this.props.location.pathname, false);
                this.props.GetNotice(id, false);
            }
        } else {
            this.props.GetNotices(initial_page);
        }

        // on page change
        this.props.history.listen((location) => {
            if (location.pathname.startsWith('/noticeboard/notice/')) {
                let id = get_id_from_notice_url(location.pathname, location.state.expired);
                this.props.GetNotice(id, location.state.expired);
            } else {
                this.props.GetNotices(
                    location.state.page,
                    location.state.search_keyword,
                    location.state.narrow_bookmark,
                    location.state.expired,
                    location.state.banner_id,
                    location.state.date_range);
            }
        });
    }

    render () {
        const { match } = this.props;
        const creators = [{
            name: 'Rhea Parekh',
            role: 'Backend and Frontend Developer',
            link: 'https://github.com/rheaparekh/'
        }, {
            name: 'Gouranshi Choudhary',
            role: 'Designer'
        }, {
            name: 'Harshit Khetan',
            role: 'IOS Developer',
        }, {
            name: 'Aniket Goyal',
            role: 'Android Developer'
        }
        ];

      return (
          <React.Fragment>
              <div styleName='main.app'>
                  <AppHeader appName='noticeboard'
                             userDropdown mode='app'/>
                  <AppMain>
                      <div styleName='main.app-main'>
            <SideNav history={this.props.history}/>
                          <Scrollbars autoHide>
                                  <div styleName='notice_css.notice-container'>
                                      <TabList history={this.props.history}/>
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
    GetNotices: (page, search_keyword, narrow_bookmark,
                 expired, banner_id, date_range) => {
        dispatch(GetNotices(page, search_keyword, narrow_bookmark,
            expired, banner_id, date_range))
    },
    GetNotice: (notice_id, expired) => {
        dispatch(GetNotice(notice_id, expired))
    },
    GetFilters: () => {
        dispatch(GetFilters())
    }
  }
};

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (App));