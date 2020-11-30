import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'

import { Route, Switch, withRouter, Link } from 'react-router-dom'

import { 
  Segment, 
  Container, 
  Sidebar, 
  Button,
  Menu,
  Form,
  Input,
  Icon
} from 'semantic-ui-react'


import SideNav from './sidenav'
import NoticeList from './notice/NoticeList'
import NoticeView from './notice/NoticeView'
import TabList from './TabList'
import { getNotices } from '../actions/getNotices'
import { baseNavUrl } from '../urls'

import { AppHeader, AppFooter, AppMain, getTheme } from 'formula_one'

import sidenav from '../css/sidenav.css'
import main from 'formula_one/src/css/app.css'
import app from '../css/notice.css'
import notice from '../css/notice.css'


class App extends Component {
  state = { 
    sidenavOpen: false,
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    this.page = query.get('page')
    if(!this.page){
      this.page = 1
    }
    console.log(this.page)
    this.props.getNotices(this.page)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const query = new URLSearchParams(this.props.location.search)
      this.page = query.get('page')
      if (!this.page) {
        this.page = 1
      }
      console.log(this.page)
      this.props.getNotices(this.page)
    }
  }

  toggleSidenav = () => {
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    })
  }

  render() {
    const { history, location, notices } = this.props
    const { sidenavOpen } = this.state

    const creators = []
    const { match } = this.props

    console.log(notices)
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
                  <SideNav match={match} history={history} />
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
                    path='/noticeboard/notice/:noticeId'
                    component={NoticeView}
                  />
                  <Route
                    exact
                    path='/noticeboard'
                    render={() => (
                      <NoticeList notices={notices} pages={this.props.totalPages} activePage={this.page} location={location} />
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
    notices: state.notices.notices,
    totalPages: state.notices.totalPages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotices: (page) => {
      dispatch(
        getNotices(page)
      )
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
