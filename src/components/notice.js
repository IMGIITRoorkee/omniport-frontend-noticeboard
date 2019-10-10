import React, { Component } from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment'
import { noticeBookmark, toggleSelect } from '../actions/index'
import { INTIAL_PAGE } from '../constants/constants'

import notice from '../css/notice.css'
class Notice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      check: false
    }
  }
  openNotice = e => {
    const { id, history, expired } = this.props
    let path
    if (expired) {
      path = '/noticeboard/notice/old/' + id
    } else {
      path = '/noticeboard/notice/' + id
    }
    history.push({
      pathname: path,
      state: { page: INTIAL_PAGE, expired: expired }
    })
  }
  componentDidUpdate(prevProps) {
    const { selectAllActive, id, selectedNotices } = this.props
    if (selectAllActive !== prevProps.selectAllActive) {
      this.setState({
        check: selectAllActive && selectedNotices.includes(id)
      })
    }
  }

  bookmarkNotice = e => {
    const { id, bookmark, noticeBookmark, expired } = this.props
    if (!expired) {
      noticeBookmark([id], !bookmark)
    }
  }

  selectNotice = e => {
    const { id, toggleSelect } = this.props
    const { check } = this.state
    this.setState(
      {
        check: !check
      },
      toggleSelect(id)
    )
  }
  render() {
    const {
      date,
      banner,
      title,
      read,
      bookmark,
      expired,
      id,
      selectedNotices
    } = this.props
    const { check } = this.state
    return (
      <Table.Row
        styleName={
          read
            ? 'notice.notice-row-read notice.notice-row'
            : 'notice.notice-row-unread notice.notice-row'
        }
      >
        <Table.Cell
          styleName={
            expired
              ? 'notice.cell-width-1'
              : 'notice.cell-width-1 notice.cell-hover'
          }
          onClick={this.selectNotice}
        >
          {expired ? (
            <Icon name="square outline" />
          ) : (
            <Icon
              name={check ? 'square' : 'square outline'}
              color={check ? 'blue' : 'grey'}
            />
          )}
        </Table.Cell>
        <Table.Cell
          styleName={
            expired
              ? 'notice.cell-width-1'
              : 'notice.cell-width-1 notice.cell-hover'
          }
          onClick={this.bookmarkNotice}
        >
          {expired ? (
            <Icon name="bookmark outline" />
          ) : (
            <Icon
              name={bookmark ? 'bookmark' : 'bookmark outline'}
              color="yellow"
            />
          )}
        </Table.Cell>
        <Table.Cell
          collapsing
          onClick={this.openNotice}
          styleName="notice.cell-width-3 notice.cell-hover"
        >
          {banner.name}
        </Table.Cell>
        <Table.Cell
          collapsing
          onClick={this.openNotice}
          styleName="notice.cell-hover"
        >
          {title}
        </Table.Cell>
        <Table.Cell
          onClick={this.openNotice}
          styleName="notice.cell-width-2 notice.cell-date notice.cell-hover"
        >
          {moment(date).format('MMM Do')}
        </Table.Cell>
        <Table.Cell
          onClick={this.openNotice}
          styleName="notice.cell-width-2 notice.cell-hover"
        >
          {moment(date).format('LT')}
        </Table.Cell>
      </Table.Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    expired: state.allNotices.expired,
    selectAllActive: state.allNotices.selectAllActive,
    selectedNotices: state.allNotices.selectedNotices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    noticeBookmark: (noticeIdList, bookmark) => {
      dispatch(noticeBookmark(noticeIdList, bookmark))
    },
    toggleSelect: noticeId => {
      dispatch(toggleSelect(noticeId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notice)
