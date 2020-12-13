import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'

import { Route, Switch, withRouter, Link } from 'react-router-dom'

import { 
  Sidebar
} from 'semantic-ui-react'


import SideNav from './sidenav'
import NoticeList from './notice/NoticeList'
import NoticeView from './notice/NoticeView'
import TabList from './TabList'
import { getNotices } from '../actions/getNotices'
import { getFilters } from '../actions/getFilters'

import { AppHeader, AppFooter, AppMain } from 'formula_one'

import { setUser } from '../actions/setUser'

import sidenav from '../css/sidenav.css'
import main from 'formula_one/src/css/app.css'
import app from '../css/notice.css'


class App extends Component {
  state = { 
    sidenavOpen: false,
  }

  setPage = () => {
    const query = new URLSearchParams(this.props.location.search)
    this.page = query.get('page')
    if (!this.page) {
      this.page = 1
    }
    this.props.getNotices(this.page)
  }

  componentDidMount() {
    const { setUser, getFilters } = this.props
    setUser()
    getFilters()
  }

  toggleSidenav = () => {
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    })
  }

  render() {
    const { history, location, user, filters, match } = this.props
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
                    render={(match) => (
                      user?<NoticeView expired={true} match={match} user={user} />:null
                    )}
                  />
                  <Route
                    path='/noticeboard/notice/:noticeId'
                    render={(match) => (
                      user?<NoticeView expired={false} match={match} user={user} />:null
                    )}
                  />
                  <Route
                    exact
                    path='/*'
                    render={() => (
                      <NoticeList pages={this.props.totalPages} location={location} />
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
    filters: state.filters.filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotices: (page) => {
      dispatch(
        getNotices(page)
      )
    },
    setUser: () => {
      dispatch(
        setUser()
      )
    },
    getFilters: () => {
      dispatch(
        getFilters()
      )
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
