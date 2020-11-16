import React, { Component } from 'react'
import { isMobile } from 'react-device-detect'

import { Container, Menu, Button, Icon, Segment, Table, Pagination } from 'semantic-ui-react'

import { Route, withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import NoticeCell from './NoticeCell'

import notice from '../../css/notice.css'
import noticesReducer from '../../reducers/noticesReducer'


class NoticeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mark: false,
            totalPages: null
        }
    }

    componentDidMount() {
        console.log(this.props.notices)
        console.log(Object.keys(this.props.notices).length)
        this.totalPages = Math.ceil(this.props.notices.count / 10)
        if (this.totalPages === 0) {
            // The total pages can't be 0 in Pagination component
            this.totalPages = 1
        }
        console.log(this.totalPages)
    }

    handlePaginationChange = (e, data) => {
        console.log(data)
        this.props.history.push(`${this.props.location.pathname}?page=${e}`)
    }

    changeMark = () => {
        this.setState({
            mark: !this.state.mark
        })
    }

    render() {
        const { notices } = this.props
        return (
            <>
                <div styleName='notice.notice-list'>
                    <Container styleName='notice.notice-container-width'>
                        <div styleName='notice.notice-type-heading'>
                            <Icon name={"bars"} color='blue' />
                            <span>{"All Notices"}</span>
                        </div>
                    </Container>
                    <React.Fragment>
                        <Container styleName='notice.select-all-container notice.notice-container-width'>
                            {this.state.mark ?
                                (
                                    <div>
                                        <Button
                                            icon
                                            styleName='notice.select-all-button-activated notice.select-all-button notice.tab-button'
                                            onClick={this.changeMark}
                                        >
                                            <Icon name='square' color='blue'></Icon>
                                        </Button>
                                        <Segment styleName='notice.select-all-list notice.select-all-activated-list'>
                                            <Button
                                                basic
                                                styleName='notice.tab-button'
                                                icon
                                            // onClick={this.read}
                                            >
                                                <Icon
                                                    name='envelope open outline'
                                                    color='blue'
                                                    styleName='notice.buttons-select-all'
                                                ></Icon>
                                            Mark as Read
                                        </Button>
                                            <Button
                                                basic
                                                styleName='notice.tab-button'
                                                icon
                                            // onClick={this.bookmark}
                                            >
                                                <Icon
                                                    name='bookmark'
                                                    color='blue'
                                                    styleName='notice.buttons-select-all'
                                                ></Icon>
                                                Bookmark
                                        </Button>
                                            <Button
                                                basic
                                                styleName='notice.tab-button'
                                                icon
                                            // onClick={this.removeBookmark}
                                            >
                                                <Icon
                                                    name='bookmark outline'
                                                    color='blue'
                                                    styleName='notice.buttons-select-all'
                                                ></Icon>
                                                Remove Bookmark
                                        </Button>
                                        </Segment>
                                    </div>
                                )
                                :
                                (
                                    <div styleName='notice.table-row'>
                                        <Button
                                            icon
                                            styleName='notice.select-all-button-not-activated  notice.select-all-button'
                                            onClick={this.changeMark}
                                        >
                                            <Icon name='square outline'> </Icon>
                                        </Button>
                                        <Segment styleName='notice.select-all-list notice.display-filters'>
                                            <div styleName='notice.filter-block'>
                                                {/* {bannerName || dateDisplay ? 'Filters:' : null}
                                            {bannerName ? ` ${bannerName}` : null}
                                            {bannerName && dateDisplay ? '; ' : null}
                                            {dateDisplay ? ` ${dateDisplay}` : null} */}
                                            </div>
                                        </Segment>
                                    </div>
                                )
                            }
                        </Container>
                    </React.Fragment>
                    <div>
                        <Container styleName='notice.notice-list-view notice.notice-container-width'>
                            <Table basic celled singleLine compact unstackable selectable styleName='notice.table'>
                                <Table.Body>
                                    {notices.map(noticeInfo => {
                                        return (
                                            <NoticeCell
                                                key={noticeInfo.id}
                                                id={noticeInfo.id}
                                                date={noticeInfo.datetimeModified}
                                                banner={noticeInfo.banner}
                                                title={noticeInfo.title}
                                                read={noticeInfo.read}
                                                important={noticeInfo.isImportant}
                                                bookmark={noticeInfo.starred}
                                                uploader={noticeInfo.uploader}
                                            />
                                        )
                                    })}

                                    {/* <NoticeCell />
                                <NoticeCell /> */}
                                </Table.Body>
                            </Table>
                        </Container>
                    </div>
                </div>

                <Container styleName='notice.pagination-box notice.notice-container-width'>
                    <Pagination
                        styleName='notice.pagination'
                        totalPages={this.totalPages}
                        firstItem={null}
                        activePage={1}
                        onPageChange={this.handlePaginationChange}
                        defaultActivePage={1}
                        lastItem={null}
                    />
                </Container>
            </>
        )
    }
}

export default withRouter(connect(null, null)(NoticeList))
