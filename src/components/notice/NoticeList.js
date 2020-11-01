import React, { Component } from 'react'
import { isMobile } from 'react-device-detect'

import { Container, Menu, Button, Icon, Segment, Table } from 'semantic-ui-react'

import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import NoticeCell from './NoticeCell'

import notice from '../../css/notice.css'


class NoticeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mark: false
        }
    }

    changeMark = () => {
        this.setState({
            mark: !this.state.mark
        })
    }

    render() {
        return (
            <div styleName='notice.notice-list'>
                <Container styleName='notice.notice-container-width'>
                    <div styleName='notice.notice-type-heading'>
                        <Icon name={"bars"} color='blue' />
                        <span>{"All Notices"}</span>
                    </div>
                </Container>
                <React.Fragment>
                    <Container styleName='notice.select-all-container notice.notice-container-width'>
                        {this.state.mark?
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
                                <NoticeCell/>
                                <NoticeCell />
                                <NoticeCell />
                            </Table.Body>
                        </Table>
                    </Container>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(NoticeList)
