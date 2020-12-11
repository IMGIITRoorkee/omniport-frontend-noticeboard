import React, { Component } from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { ifRole } from 'formula_one'

import moment from 'moment'

import { baseNavUrl } from '../../urls'
import { noticeBookmark } from '../../actions/bookmark'
import { selectNotice } from '../../actions/selectNotices'

import notice from '../../css/notice.css'


class NoticeCell extends Component {

    openNotice = () => {
        const { id, history, expired } = this.props
        let path
        if (expired) {
            path = '/notice/old/' + id
        } else {
            path = '/notice/' + id
        }
        history.push(baseNavUrl(path))
    }

    bookmarkNotice = () => {
        const { id, bookmark, noticeBookmark, expired } = this.props
        if (!expired) {
            noticeBookmark([id], !bookmark)
        }
    }

    selectNotice = () => {
        const { selectNotice, id } = this.props
        selectNotice(id)
    }

    render() {
        const { date, banner, title, read, important, bookmark, uploader, user, expired, id, selectedNotices } = this.props
        const check = selectedNotices.includes(id)

        return (
            <Table.Row
                styleName={
                    read
                        ? 'notice.notice-row-read notice.notice-row'
                        : 'notice.notice-row-unread notice.notice-row'
                }
            >
                {(user && ifRole(user.roles, 'Guest') === 'IS_ACTIVE') ||
                expired ? null : (
                    <>
                        <Table.Cell
                            width={1}
                            styleName={'notice.cell-width-1 notice.cell-hover'}
                            onClick={this.selectNotice}
                            collapsing
                        >
                            <Icon
                                name={check ? 'square' : 'square outline'}
                                color={check ? 'blue' : 'grey'}
                            />
                        </Table.Cell>
                        <Table.Cell
                            width={1}
                            styleName={'notice.cell-width-1 notice.cell-hover'}
                            onClick={this.bookmarkNotice}
                        >
                            <Icon
                                name={bookmark ? 'bookmark' : 'bookmark outline'}
                                color='yellow'
                            />
                        </Table.Cell>
                    </>
                )}
                {!isMobile?
                    (
                        <Table.Cell
                            width={4}
                            collapsing
                            onClick={this.openNotice}
                            styleName='notice.cell-width-2 notice.cell-hover'
                            title={banner.name}
                        >
                            {banner.name}
                        </Table.Cell>
                    )
                    :
                    null
                }
                <Table.Cell
                    width={isMobile ? 7 : 10}
                    collapsing
                    onClick={this.openNotice}
                    styleName='notice.cell-width-4 notice.cell-hover'
                    title={title}
                >
                    <span styleName='notice.tag-margin-right'>
                        {important ? (
                            <Icon name='tag' color='blue' />
                        ) : null}
                    </span>
                    {title}
                </Table.Cell>
                {!isMobile ? 
                    (
                        <Table.Cell
                            onClick={this.openNotice}
                            collapsing
                            styleName='notice.cell-width-2 notice.cell-hover'
                            width={2}
                            title={uploader.fullName}
                        >
                            {uploader.fullName}
                        </Table.Cell>
                    ) 
                    : 
                    (
                        null
                    )
                }
                <Table.Cell
                    width={isMobile ? 3 : 4}
                    onClick={this.openNotice}
                    textAlign='center'
                    collapsing
                    styleName='notice.cell-width-2 notice.cell-hover'
                >
                    {moment(date).format(
                        Date.now().year === moment(date).year() ? 'DD/MM/YY' : 'MMM Do'
                    )}
                </Table.Cell>
                <Table.Cell
                    // onClick={}
                    collapsing
                    textAlign='center'
                    styleName='notice.cell-width-1'
                    width={1}
                >
                    <Icon name='pencil' styleName='notice.cell-hover' />
                </Table.Cell>
                <Table.Cell
                    // onClick={}
                    collapsing
                    textAlign='center'
                    styleName='notice.cell-width-1'
                    width={1}
                >
                    <Icon name='trash' styleName='notice.cell-hover' />
                </Table.Cell>
            </Table.Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        selectedNotices: state.notices.selectedNotices
    }
}

const mapDispatchToProps = dispatch => {
    return {
        noticeBookmark: (id, bookmark) => {
            dispatch(noticeBookmark(id, bookmark))
        },
        selectNotice: (id) => {
            dispatch(selectNotice(id))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoticeCell))
