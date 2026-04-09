import React from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { isMobile } from 'react-device-detect'

import { AppHeader, AppFooter, AppMain } from 'formula_one'
import { INTIAL_PAGE } from '../constants/constants'

import { Sidebar } from 'semantic-ui-react'

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
  getUser,
  toggleSidenav,
  setPosition
} from '../actions/index'

import sidenav from '../css/sidenav.css'
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
  handleLocationChange = location => {
    const { getNotice, getNotices, setPosition } = this.props

    const params = new URLSearchParams(location.search)
    const page = parseInt(params.get('page')) || INTIAL_PAGE
    const searchKeyword = params.get('search')
    const bannerId = params.get('bannerId')
    const mainCategorySlug = params.get('mainCategorySlug')
    const dateRangeStr = params.get('dateRange')
    const expiredParam = params.get('expired') === 'true'
    const bookmarkParam = params.get('bookmark') === 'true'
    const showImp = params.get('showImp') === 'true'

    const expiredByPath = location.pathname.startsWith(
      '/noticeboard/notice/old/'
    )
    const expired = expiredByPath || expiredParam

    if (location.pathname.startsWith('/noticeboard/notice/')) {
      const id = getIdFromNoticeUrl(location.pathname, expired)
      getNotice(id, expired, () => {})
      return
    }

    let position = 'home'
    if (expiredParam) {
      position = 'expired'
    } else if (bookmarkParam) {
      position = 'bookmark'
    } else if (showImp) {
      position = 'important'
    }
    setPosition(position)

    let dateRange = null
    if (dateRangeStr) {
      const [start, end] = dateRangeStr.split(',')
      if (start && end) {
        dateRange = { start, end }
      }
    }

    const narrowBookmark = bookmarkParam

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
  }

  componentDidMount () {
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

    // Initial URL load
    this.handleLocationChange(location)

    // Subsequent URL changes
    history.listen(this.handleLocationChange)
  }

  render () {
    const { history, sidenavOpen, toggleSidenav } = this.props
    const creators = [
      {
        name: 'Rhea Parekh',
        role: 'Backend and Frontend Developer',
        link: 'https://github.com/rheaparekh/'
      },
      {
        name: 'Tushar Varshney',
        role: 'Frontend Developer',
        link: 'https://github.com/Tushar19varshney/'
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
        <div styleName='main.app'>
          <AppHeader
            sideBarButton={isMobile}
            sideBarVisibility={sidenavOpen}
            onSidebarClick={toggleSidenav}
            appName='noticeboard'
            userDropdown
            mode='app'
          />
          <AppMain>
            <div styleName='main.app-main'>
              {isMobile ? (
                <div styleName='sidenav.app-sidebar-main'>
                  <Sidebar
                    animation='overlay'
                    styleName='sidenav.app-sidebar-wrapper'
                    visible={sidenavOpen}
                  >
                    <SideNav history={history} />
                  </Sidebar>
                </div>
              ) : (
                <SideNav history={history} />
              )}
              <Scrollbars autoHide>
                <div styleName='app.notice-container'>
                  <TabList history={history} />
                  <Route
                    exact
                    path='/noticeboard'
                    render={props => (
                      <NoticeListView {...props} history={history} />
                    )}
                  />
                  <Route
                    path='/noticeboard/notice/:noticeId'
                    component={NoticeView}
                  />
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
  return {
    notices: state,
    search: state.allNotices.searchKeyword,
    sidenavOpen: state.allNotices.sidenavOpen
  }
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
    setPosition: (position, subPosition) => {
      dispatch(setPosition(position, subPosition))
    },
    getNotice: (noticeId, expired, callback) => {
      dispatch(getNotice(noticeId, expired, callback))
    },
    getFilters: () => {
      dispatch(getFilters())
    },
    getPermissions: () => {
      dispatch(getPermissions())
    },
    getUser: () => {
      dispatch(getUser())
    },
    toggleSidenav: () => {
      dispatch(toggleSidenav())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
