import React, { Component } from 'react'
import { Container, Menu } from 'semantic-ui-react'
import DropdownView from './dropdowns'
import BackLink from './all-notices-button'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import tablist from '../css/notice.css'

class TabList extends Component {
  render () {
    const { narrowBookmark, expired } = this.props

    return (
      <Container styleName='tablist.notice-container-width'>
        <Menu secondary styleName='tablist.top-bar'>
          {!narrowBookmark && !expired ? (
            <div styleName='tablist.width-100'>
              <Route path='/noticeboard/notice' component={BackLink} />
              <Route exact path='/noticeboard/' component={DropdownView} />
            </div>
          ) : (
            <BackLink />
          )}
        </Menu>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    narrowBookmark: state.allNotices.narrowBookmark,
    expired: state.allNotices.expired
  }
}

export default withRouter(connect(mapStateToProps)(TabList))
