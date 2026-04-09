import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPosition } from '../actions'

import EditModal from './notice-modal'

import backlink from '../css/notice.css'
import { HIDE_IMP } from '../constants/action-types'

const buildNoticeboardUrl = ({
  page,
  searchKeyword,
  bannerId,
  mainCategorySlug,
  dateRange,
  expired,
  bookmark
} = {}) => {
  const params = new URLSearchParams()

  if (page) {
    params.set('page', page)
  }

  if (searchKeyword) {
    params.set('search', searchKeyword)
  }

  if (bannerId) {
    params.set('bannerId', bannerId)
  }

  if (mainCategorySlug) {
    params.set('mainCategorySlug', mainCategorySlug)
  }

  if (dateRange && dateRange.start && dateRange.end) {
    params.set('dateRange', `${dateRange.start},${dateRange.end}`)
  }

  if (expired) {
    params.set('expired', 'true')
  }

  if (bookmark) {
    params.set('bookmark', 'true')
  }

  const queryString = params.toString()
  return queryString ? `/noticeboard/?${queryString}` : '/noticeboard/'
}

class BackLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEditModal: false
    }
    this.modalRef = React.createRef()
  }
  allNotices = () => {
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
      hideImportant,
      match,
      location
    } = this.props

    // Leaving important view should clear the important flag in Redux
    if (important === false) {
      hideImportant()
    }

    const isDetailView =
      location && location.pathname &&
      location.pathname.startsWith('/noticeboard/notice/')
    const fromBookmarkDetail =
      isDetailView &&
      location &&
      location.state &&
      location.state.bookmark

    let targetPosition = 'home'
    let targetBookmark = false
    let targetExpired = false

    if (isDetailView) {
      if (fromBookmarkDetail) {
        targetPosition = 'bookmark'
        targetBookmark = true
      } else if (expired) {
        targetPosition = 'expired'
        targetExpired = true
      }
    }

    setPosition(targetPosition)

    const url = buildNoticeboardUrl({
      page,
      searchKeyword,
      bannerId,
      mainCategorySlug,
      dateRange,
      expired: targetExpired,
      bookmark: targetBookmark
    })

    history.push(url)
  }
  toggleEditModal = () => {
    const { showEditModal } = this.state
    this.setState({
      showEditModal: !showEditModal
    })
  }
  render () {
    const { showEditModal } = this.state
    const { match, editButton, notice, user } = this.props

    return (
      <Menu.Menu>
        <Menu.Item styleName='backlink.back-button backlink.back-wrapper'>
          <Button
            styleName='backlink.menu-button-border backlink.tab-button'
            onClick={this.allNotices}
            icon='arrow left'
            content='Back'
          />
          <div
            styleName='backlink.modal-mount-parent'
            ref={this.modalRef}
          ></div>

          {showEditModal ? (
            <EditModal
              id={match.params && match.params.noticeId}
              modalType='edit'
              modalRef={this.modalRef}
              handleModal={this.toggleEditModal}
              modal={showEditModal}
              fetchNotice={true}
            />
          ) : null}
          {notice && notice.uploader.id == user.id && editButton ? (
            <Button
              content='Edit'
              styleName='backlink.back-edit-button'
              onClick={this.toggleEditModal}
            />
          ) : (
            <></>
          )}
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
    dateRange: state.allNotices.dateRange,
    notice: state.notice.notice,
    user: state.user.user
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
  connect(mapStateToProps, mapDispatchToProps)(BackLink)
)
