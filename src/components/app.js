import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'

import { Route, Switch, withRouter } from 'react-router-dom'

import { 
  Sidebar
} from 'semantic-ui-react'

import SideNav from './sidenav'
import NoticeList from './notice/NoticeList'
import NoticeView from './notice/NoticeView'
import TabList from './TabList'
import { getNotices } from '../actions/getNotices'
import { getFilters } from '../actions/getFilters'
import { getPermissions } from '../actions/getPermissions'
import { setUser } from '../actions/setUser'

import { AppHeader, AppFooter, AppMain } from 'formula_one'

import sidenav from '../css/sidenav.css'
import main from 'formula_one/src/css/app.css'
import app from '../css/notice.css'


class App extends Component {
  state = { 
    sidenavOpen: false,
  }

  componentDidMount() {
    const { setUser, getFilters, getPermissions } = this.props
    setUser()
    getFilters()
    getPermissions()
  }

  toggleSidenav = () => {
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    })
  }

  render() {
    const { history, location, user, filters, match, isFetchingUser, totalPages } = this.props
    const { sidenavOpen } = this.state

    const creators = []
    
    return (
      <div styleName='main.app'>
        <AppHeader
          sideBarButton={isMobile}
          sideBarVisibility={sidenavOpen}
          onSidebarClick={this.toggleSidenav}
          appName='noticeboard'
          userDropdown
          mode='app'
        />
        <AppMain>
          <div styleName='main.app-main'>
            {isMobile ? (
              <div styleName='sidenav.app-sidebar-main'>
                <Sidebar
                  match={match}
                  animation='overlay'
                  styleName='sidenav.app-sidebar-wrapper'
                  visible={sidenavOpen}
                >
                  {filters?<SideNav match={match} history={history} filters={filters} />:null}
                </Sidebar>
              </div>
            ) : (
                <SideNav match={match} history={history} />
              )}
            <Scrollbars autoHide>
              <div styleName='app.notice-container'>
                <TabList />
                  <Switch>
                    <Route
                      path='/noticeboard/notice/old/:noticeId'
                      render={() => (
                        <NoticeView expired={true} match={match} user={user} />
                      )}
                    />
                    <Route
                      path='/noticeboard/notice/:noticeId'
                      render={(match) => (
                        <NoticeView expired={false} match={match} user={user} />
                      )}
                    />
                    <Route
                      path='/noticeboard'
                      render={() => (
                        <NoticeList pages={totalPages} location={location} />
                      )}
                    />
                  </Switch>
              </div>
            </Scrollbars>
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    totalPages: state.notices.totalPages,
    user: state.user.user,
    filters: state.filters.filters,
    isFetchingUser: state.user.isFetchingUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotices: (page) => {
      dispatch(getNotices(page))
    },
    setUser: () => {
      dispatch(setUser())
    },
    getFilters: () => {
      dispatch(getFilters())
    },
    getPermissions: () => {
      dispatch(getPermissions())
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
