import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPosition } from '../actions'

import backlink from '../css/notice.css'
import { HIDE_IMP } from '../constants/action-types'

class BackLink extends Component {
  allNotices = (path, position) => {
    console.log("CHECK PUSH")
    const {
      page,
      searchKeyword,
      narrowBookmark,
      bannerId,
      mainCategorySlug,
      expired,
      dateRange,
      history,
      setPosition,
      important,
      hideImportant
    } = this.props

    let narrowTemp = narrowBookmark
    if (narrowTemp) {
      narrowTemp = !narrowTemp
    }

    important === false ? hideImportant() : null

    setPosition(position)

    let expiredTemp = expired
    if (expiredTemp) {
      expiredTemp = !expired
    }

    history.push({
      pathname: path,
      state: {
        page: page,
        searchKeyword: searchKeyword,
        narrowBookmark: narrowTemp,
        bannerId: bannerId,
        mainCategorySlug: mainCategorySlug,
        expired: expiredTemp,
        dateRange: dateRange
      }
    })
  }
  render() {
    return (
      <Menu.Menu position="left">
        <Menu.Item styleName="backlink.back-button">
          <Button
            styleName="backlink.menu-button-border backlink.tab-button"
            onClick={() => this.allNotices('/noticeboard/', 'home')}
            icon="arrow left"
            content="Back"
          />
        </Menu.Item>
      </Menu.Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    page: state.allNotices.page,
    searchKeyword: state.allNotices.searchKeyword,
    narrowBookmark: state.allNotices.narrowBookmark,
    expired: state.allNotices.expired,
    bannerId: state.allNotices.bannerId,
    mainCategorySlug: state.allNotices.mainCategorySlug,
    dateRange: state.allNotices.dateRange
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPosition: position => {
      dispatch(setPosition(position))
    },
    hideImportant: () => {
      dispatch({
        type: HIDE_IMP,
        payload: {}
      })
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BackLink)
)
