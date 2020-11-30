import React, { Component } from 'react'
import { Container, Menu, Table, Icon } from 'semantic-ui-react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'

import moment from 'moment'

import notice from '../../css/notice.css'
import { baseNavUrl } from '../../urls'

class NoticeCell extends Component {

    openNotice = () => {
        this.props.history.push(baseNavUrl('/notice/'+this.props.id))
    }

    render() {
        const check = null
        const { date, banner, title, read, important, bookmark, uploader } = this.props
        return (
            <Table.Row
                styleName={
                    read
                        ? 'notice.notice-row-read notice.notice-row'
                        : 'notice.notice-row-unread notice.notice-row'
                }
            >
                <Table.Cell
                    width={1}
                    styleName={'notice.cell-width-1 notice.cell-hover'}
                    // onClick={this.selectNotice}
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
                    // onClick={this.bookmarkNotice}
                >
                    <Icon
                        name={bookmark ? 'bookmark' : 'bookmark outline'}
                        color='yellow'
                    />
                </Table.Cell>
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

export default withRouter(connect(null, null)(NoticeCell))
