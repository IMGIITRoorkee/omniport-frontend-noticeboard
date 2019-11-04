import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'

import { AppHeader, AppFooter, AppMain } from 'formula_one'
import { INTIAL_PAGE } from '../constants/constants'

import NoticeListView from './notice-segment'
import NoticeView from './notice-view'
import TabList from './tab-list'
import SideNav from './sidenav'

import { Route, withRouter } from 'react-router-dom'
import {
  getNotice,
  getNotices,
  getFilters,
  getPermissions,
  getUser
} from '../actions/index'

import main from 'formula_one/src/css/app.css'
import app from '../css/notice.css'

const getIdFromNoticeUrl = (url, expired) => {
  let noticeId
  if (!expired) {
    noticeId = +url.split('/')[3]
  } else {
    noticeId = +url.split('/')[4]
  }
  return noticeId
}

class App extends React.PureComponent {
  componentDidMount() {
    const {
      getFilters,
      getNotice,
      getNotices,
      getPermissions,
      location,
      history,
      getUser
    } = this.props
    getFilters()
    getUser()
    getPermissions()

    // Direct url hit
    if (location.pathname.startsWith('/noticeboard/notice/')) {
      if (location.pathname.startsWith('/noticeboard/notice/old/')) {
        let id = getIdFromNoticeUrl(location.pathname, true)
        getNotice(id, {}, true)
      } else {
        let id = getIdFromNoticeUrl(location.pathname, false)
        getNotice(id, {}, false)
      }
    } else {
      getNotices(INTIAL_PAGE)
    }

    // on page change
    history.listen(location => {
      if (location.pathname.startsWith('/noticeboard/notice/')) {
        let id = getIdFromNoticeUrl(location.pathname, location.state.expired)
        getNotice(id, location.state.expired)
      } else {
        getNotices(
          location.state.page,
          location.state.searchKeyword,
          location.state.narrowBookmark,
          location.state.expired,
          location.state.bannerId,
          location.state.mainCategorySlug,
          location.state.dateRange,
          location.state.showImp,
        )
      }
    })
  }

  render() {
    const { history } = this.props
    const creators = [
      {
        name: 'Rhea Parekh',
        role: 'Backend and Frontend Developer',
        link: 'https://github.com/rheaparekh/'
      },
      {
        name: 'Gouranshi Choudhary',
        role: 'Designer'
      },
      {
        name: 'Harshit Khetan',
        role: 'IOS Developer'
      },
      {
        name: 'Aniket Goyal',
        role: 'Android Developer'
      }
    ]

    return (
      <React.Fragment>
        <div styleName="main.app">
          <AppHeader appName="noticeboard" userDropdown mode="app" />
          <AppMain>
            <div styleName="main.app-main">
              <SideNav history={history} />
              <Scrollbars autoHide>
                <div styleName="app.notice-container">
                  <TabList history={history} />
                  <Route
                    exact
                    path="/noticeboard"
                    render={props => (
                      <NoticeListView {...props} history={history} />
                    )}
                  />
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
  return { notices: state, search: state.allNotices.searchKeyword }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotices: (
      page,
      searchKeyword,
      narrowBookmark,
      expired,
      bannerId,
      mainCategorySlug,
      dateRange,
      showImp
    ) => {
      dispatch(
        getNotices(
          page,
          searchKeyword,
          narrowBookmark,
          expired,
          bannerId,
          mainCategorySlug,
          dateRange,
          showImp
        )
      )
    },
    getNotice: (noticeId, callback, expired) => {
      dispatch(getNotice(noticeId, callback, expired))
    },
    getFilters: () => {
      dispatch(getFilters())
    },
    getPermissions: () => {
      dispatch(getPermissions())
    },
    getUser: () => {
      dispatch(getUser())
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
