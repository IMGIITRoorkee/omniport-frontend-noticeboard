import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'

import { Route, Switch, withRouter } from 'react-router-dom'

import { 
  Segment, 
  Container, 
  Sidebar, 
  Button,
  Menu 
} from 'semantic-ui-react'

import SideNav from './sidenav'

import { AppHeader, AppFooter, AppMain, getTheme } from 'formula_one'

import sidenav from '../css/sidenav.css'
import main from 'formula_one/src/css/app.css'
import app from '../css/notice.css'
import notice from '../css/notice.css'
import dropdown from '../css/notice.css'
import tablist from '../css/notice.css'

class App extends Component {
  state = { 
    sidenavOpen: false,
  }

  toggleSidenav = () => {
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    })
  }

  render() {
    const { history } = this.props
    const { sidenavOpen } = this.state

    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Mentor',
        link: 'https://dhruvkb.github.io/'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend developer',
        link: 'https://pradumangoyal.github.io'
      }
    ]
    const { match } = this.props
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
                <Container styleName='tablist.notice-container-width'>
                  <Menu secondary styleName='tablist.top-bar'>
                    <div styleName='tablist.width-100'>
                      <div>
                        <div styleName='dropdown.important-main-box dropdown.flex dropdown.flex-row'>
                          <div styleName='dropdown.important-sub-left dropdown.flex dropdown.flex-column'>
                            <h4>
                              Important notices
                            {/* {importantUnreadCount > 0 ? (
                                <Label
                                  styleName='dropdown.unread-label'
                                  size='small'
                                  color='red'
                                  horizontal
                                >
                                  {importantUnreadCount} unread
                                </Label>
                              ) : null} */}
                            </h4>
                          </div>
                          <div styleName='dropdown.important-sub-right'>
                            <Button
                              basic
                              color='blue'
                              content='Show All'
                              styleName='dropdown.important-button'
                              // onClick={this.handleImportant}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Menu>
                </Container>
              </div>
            </Scrollbars>
            {/* <Switch>
              <Route
                exact
                path={`${match.path}`}
                component={}
              />
            </Switch> */}
          </div>
        </AppMain>
        <AppFooter creators={creators} />
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  null
)(App))
