import React, { Component } from 'react'

import { Container, Menu, Button, Icon, Segment, Table, Pagination } from 'semantic-ui-react'

import { Route, withRouter, useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import NoticeCell from './NoticeCell'
import { baseNavUrl } from '../../urls'

import notice from '../../css/notice.css'
import noticesReducer from '../../reducers/noticesReducer'


class NoticeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mark: false
        }
    }

    handlePaginationChange = (e, data) => {
        console.log(data)
        this.props.history.push(`${this.props.location.pathname}?page=${data.activePage}`)
    }

    changeMark = () => {
        this.setState({
            mark: !this.state.mark
        })
    }

    render() {
        const { notices, pages, activePage, history } = this.props
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
                                                history={history}
                                            />
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Container>
                    </div>
                </div>

                <Container styleName='notice.pagination-box notice.notice-container-width'>
                    <Pagination
                        styleName='notice.pagination'
                        totalPages={pages}
                        firstItem={null}
                        // activePage={1}
                        onPageChange={this.handlePaginationChange}
                        defaultActivePage={activePage?activePage:1}
                        lastItem={null}
                    />
                </Container>
            </>
        )
    }
}

export default withRouter(connect(null, null)(NoticeList))
