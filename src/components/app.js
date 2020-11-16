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
import { DatesRangeInput } from 'semantic-ui-calendar-react'

import SideNav from './sidenav'
import NoticeList from './notice/NoticeList'
import { getNotices } from '../actions/getNotices'

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

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    this.page = query.get('page')
    if(!this.page){
      this.page = 1
    }
    console.log(this.page)
    this.props.getNotices(this.page)
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
                            <Link to={`${match.path}important/`}>
                              <Button
                                basic
                                color='blue'
                                content='Show All'
                                styleName='dropdown.important-button'
                                // onClick={this.handleImportant}
                              />
                            </Link>
                          </div>
                        </div>
                        <Menu.Menu position='left' styleName='dropdown.flex-wrap'>
                          <Menu.Item styleName='dropdown.date-bar'>
                            {/* {!dateFilterActive ? ( */}
                            <Form
                              // onSubmit={this.handleDateFilterSubmit} 
                              autoComplete='off'
                            >
                              <DatesRangeInput
                                styleName='dropdown.input-bar'
                                name='datesRange'
                                placeholder='Date: From - To'
                                closable={true}
                                closeOnMouseLeave={true}
                                value={"2020-10-07 - 2020-10-08"}
                                dateFormat='YYYY-MM-DD'
                                // onChange={this.handleDateFilterChange}
                              />
                            </Form>
                            {/* ) : ( */}
                            {/* <Form onSubmit={this.handleDateFilterSubmit} autoComplete='off'>
                              <DatesRangeInput
                                styleName='dropdown.input-bar'
                                name='datesRange'
                                placeholder='Date: From - To'
                                closable={true}
                                icon={
                                  <Icon
                                    name='delete'
                                    link
                                    onClick={this.handleDateDelete}
                                  />
                                }
                                closeOnMouseLeave={true}
                                value={datesRange}
                                dateFormat='YYYY-MM-DD'
                                onChange={this.handleDateFilterChange}
                              />
                            </Form>
                          )} */}
                          </Menu.Item>
                          <Menu.Item styleName='dropdown.search-menu-item'>
                        {/* {!searchDone ? ( */}
                          <Form onSubmit={this.handleSearchSubmit}>
                            <Input
                              styleName='dropdown.input-bar dropdown.search-bar'
                              onChange={this.handleSearchChange}
                              type='text'
                              icon={
                                <Icon
                                  name='search'
                                  link
                                  onClick={this.handleSearchSubmit}
                                />
                              }
                              // value={value}
                            />
                          </Form>
                        {/* ) : (
                            <Form onSubmit={this.handleSearchSubmit}>
                              <Input
                                styleName='dropdown.input-bar dropdown.search-bar'
                                type='text'
                                onChange={this.handleSearchChange}
                                icon={
                                  <Icon
                                    name='delete'
                                    link
                                    onClick={this.handleSearchDelete}
                                  />
                                }
                                value={value}
                              />
                            </Form>
                          )} */}
                      </Menu.Item>
                        <Menu.Item
                          position='right'
                          styleName='dropdown.upload-item-padding'
                        >
                          {/* <UploadNotice /> */}
                        </Menu.Item>
                        </Menu.Menu>
                      </div>
                    </div>
                    
                  </Menu>
                </Container>
                <NoticeList notices={notices} page={this.page} location={location} />
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

const mapStateToProps = state => {
  return {
    notices: state.notices.notices,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotices: () => {
      dispatch(
        getNotices(1)
      )
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
