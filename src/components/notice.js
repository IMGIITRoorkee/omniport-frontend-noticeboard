import React, { Component } from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment'
import { noticeBookmark, toggleSelect } from '../actions/index'
import { INTIAL_PAGE } from '../constants/constants'

import notice from '../css/notice.css'
class Notice extends Component {
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

  bookmarkNotice = e => {
    const { id, bookmark, noticeBookmark, expired } = this.props
    bookmark = !bookmark
    if (!expired) {
      noticeBookmark([id], bookmark)
    }
  }

  selectNotice = e => {
    const { id, isSelected, toggleSelect } = this.props
    isSelected = !isSelected
    toggleSelect(id, isSelected)
  }
  render() {
    const {
      date,
      banner,
      title,
      isSelected,
      read,
      bookmark,
      expired
    } = this.props
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
              name={isSelected ? 'square' : 'square outline'}
              color={isSelected ? 'blue' : 'grey'}
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
          onClick={OpenNotice}
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
    selectAllActive: state.allNotices.selectAllActive
  }
}

const mapDispatchToProps = dispatch => {
  return {
    noticeBookmark: (noticeIdList, bookmark) => {
      dispatch(noticeBookmark(noticeIdList, bookmark))
    },
    toggleSelect: (noticeId, isSelected) => {
      dispatch(toggleSelect(noticeId, isSelected))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notice)
