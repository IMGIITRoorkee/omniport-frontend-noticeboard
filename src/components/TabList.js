import React, { Component } from 'react'

import { Container, Menu, Button, Icon, Form, Input } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react'

import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import BackLink from './BackLink'
import { baseNavUrl } from '../urls'

import tablist from '../css/notice.css'
import dropdown from '../css/notice.css'

class TabList extends Component {
    state = {
        back: false,
    }

    componentDidMount() {
        const url = this.props.location.pathname.split('/')
        if (url[2] && (url[2] == "important" || url[2] == "expired" || url[2] == "bookmark" )){
            this.setState({
                back: true
            })
        }
        this.unlisten = this.props.history.listen((location) => {
            const url = location.pathname.split('/')
            console.log(url[2])
            if (url[2] && (url[2] == "important" || url[2] == "expired" || url[2] == "bookmark")) {
                this.setState({
                    back: true
                })
            }
            else {
                this.setState({
                    back: false
                })
            }
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const { back } = this.state
        return (
            <Container styleName='tablist.notice-container-width'>
                <Menu secondary styleName='tablist.top-bar'>
                    <div styleName='tablist.width-100'>
                        {back ? (
                            <BackLink />
                        ) : (
                            <div>
                                <div styleName='dropdown.important-main-box dropdown.flex dropdown.flex-row'>
                                    <div styleName='dropdown.important-sub-left dropdown.flex dropdown.flex-column'>
                                        <h4>
                                            Important notices
                                {/* {importantUnreadCount > 0 ? (
                                    <Label
                                    styleName='dropdown.unread-label'
                                    size='small'
                                    color='red'
                                    horizontal
                                    >
                                    {importantUnreadCount} unread
                                    </Label>
                                ) : null} */}
                                        </h4>
                                    </div>
                                    <div styleName='dropdown.important-sub-right'>
                                        <Link to={baseNavUrl('/important/')}>
                                            <Button
                                                basic
                                                color='blue'
                                                content='Show All'
                                                styleName='dropdown.important-button'
                                            // onClick={this.handleImportant}
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <Menu.Menu position='left' styleName='dropdown.flex-wrap'>
                                    <Menu.Item styleName='dropdown.date-bar'>
                                        {/* {!dateFilterActive ? ( */}
                                        <Form
                                            // onSubmit={this.handleDateFilterSubmit} 
                                            autoComplete='off'
                                        >
                                            <DatesRangeInput
                                                styleName='dropdown.input-bar'
                                                name='datesRange'
                                                placeholder='Date: From - To'
                                                closable={true}
                                                closeOnMouseLeave={true}
                                                value={"2020-10-07 - 2020-10-08"}
                                                dateFormat='YYYY-MM-DD'
                                            // onChange={this.handleDateFilterChange}
                                            />
                                        </Form>
                                        {/* ) : ( */}
                                        {/* <Form onSubmit={this.handleDateFilterSubmit} autoComplete='off'>
                                <DatesRangeInput
                                    styleName='dropdown.input-bar'
                                    name='datesRange'
                                    placeholder='Date: From - To'
                                    closable={true}
                                    icon={
                                    <Icon
                                        name='delete'
                                        link
                                        onClick={this.handleDateDelete}
                                    />
                                    }
                                    closeOnMouseLeave={true}
                                    value={datesRange}
                                    dateFormat='YYYY-MM-DD'
                                    onChange={this.handleDateFilterChange}
                                />
                                </Form>
                            )} */}
                                    </Menu.Item>
                                    <Menu.Item styleName='dropdown.search-menu-item'>
                                        {/* {!searchDone ? ( */}
                                        <Form onSubmit={this.handleSearchSubmit}>
                                            <Input
                                                styleName='dropdown.input-bar dropdown.search-bar'
                                                // onChange={this.handleSearchChange}
                                                type='text'
                                                icon={
                                                    <Icon
                                                        name='search'
                                                        link
                                                    // onClick={this.handleSearchSubmit}
                                                    />
                                                }
                                            // value={value}
                                            />
                                        </Form>
                                        {/* ) : (
                                <Form onSubmit={this.handleSearchSubmit}>
                                <Input
                                    styleName='dropdown.input-bar dropdown.search-bar'
                                    type='text'
                                    onChange={this.handleSearchChange}
                                    icon={
                                    <Icon
                                        name='delete'
                                        link
                                        onClick={this.handleSearchDelete}
                                    />
                                    }
                                    value={value}
                                />
                                </Form>
                            )} */}
                                    </Menu.Item>
                                    <Menu.Item
                                        position='right'
                                        styleName='dropdown.upload-item-padding'
                                    >
                                        {/* <UploadNotice /> */}
                                    </Menu.Item>
                                </Menu.Menu>
                            </div>
                        )}
                    </div>
                </Menu>
            </Container>
        )
    }
}

export default withRouter(connect(null, null)(TabList))
