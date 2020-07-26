import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setPosition } from '../actions'

import EditModal from './notice-modal'

import backlink from '../css/notice.css'
import { HIDE_IMP } from '../constants/action-types'

class BackLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEditModal: false
    }
    this.modalRef = React.createRef()
  }
  allNotices = (path, position) => {
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
            onClick={() => this.allNotices('/noticeboard/', 'home')}
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
