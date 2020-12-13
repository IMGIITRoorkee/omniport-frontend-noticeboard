import React, { Component } from 'react'

import { Container, Menu, Button, Icon, Form, Input, Label } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react'
import { dateFormatMatch } from '../utils'

import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import BackLink from './BackLink'
import { baseNavUrl } from '../urls'

import tablist from '../css/notice.css'
import dropdown from '../css/notice.css'

class TabList extends Component {
    state = {
        back: false,
        value: '',
        ownUpdate: false,
        datesRange: '',
        ownUpdateDate: false,
        dateRangeActive: false
    }

    static getDerivedStateFromProps(nextProps, state) {
        let newState = {}
        if(!state.ownUpdate) {
            newState = {
                ...newState,
                value: nextProps.searchKeyword
            }
        }
        if(!state.ownUpdateDate) {
            if(nextProps.date) {
                newState = {
                    ...newState,
                    datesRange: nextProps.date.start+'-'+nextProps.date.end,
                    dateRangeActive: true
                }
            }
            else {
                newState = {
                    ...newState,
                    datesRange: '',
                    dateRangeActive: false
                }
            }
        }
        return newState
    }

    switchBackButton = (location) => {
        const url = location.pathname.split('/')
        if (url[2] && (url[2] == "important" || url[2] == "expired" || url[2] == "bookmark" || url[2] == "notice")) {
            this.setState({
                back: true,
                value: '',
                ownUpdate: false,
                datesRange: '',
                ownUpdateDate: false,
                dateRangeActive: false
            })
        }
        else {
            this.setState({
                back: false
            })
        }
    }

    componentDidMount() {
        const { location } = this.props.history
        this.switchBackButton(location)
        this.unlisten = this.props.history.listen((location) => {
            this.switchBackButton(location)
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleDateFilterSubmit = (value) => {
        const { searchKeyword, page, history } = this.props
        let dateRange, dateRangeActive
        dateRange = dateFormatMatch(value)
        if (dateRange) {
            dateRangeActive = true
        } else {
            dateRangeActive = false
        }
        if (dateRangeActive) {
            let url = `${location.pathname}?page=${page}&date=${dateRange.start + '/' + dateRange.end}`
            if (searchKeyword) {
                url += `&search=${searchKeyword}`
            }
            history.push(url)
        }
    }

    handleDateFilterChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            let dateRange, dateRangeActive
            dateRange = dateFormatMatch(value)
            let flag = false
            if (dateRange || value === '') {
                flag = true
            }

            if (value === '') {
                dateRangeActive = false
            } else {
                dateRangeActive = true
            }
            this.setState({
                [name]: value,
                ownUpdateDate: true,
                dateRangeActive: dateRangeActive
            })
            if (flag) {
                this.handleDateFilterSubmit(value)
            }
        }
    }

    handleDateDelete = () => {
        const { page, searchKeyword, history } = this.props
        this.setState({ 
            dateRangeActive: false, 
            datesRange: '',
            ownUpdateDate: true
        })
        let url = `${location.pathname}?page=${page}`
        if (searchKeyword) {
            url += `&search=${searchKeyword}`
        }
        history.push(url)
    }

    handleSearchChange = event => {
        this.setState({ 
            value: event.target.value,
            ownUpdate: true 
        })
    }

    handleSearchSubmit = () => {
        const { page, date, history, location } = this.props
        let { value } = this.state
        value = encodeURIComponent(value)
        let url = `${location.pathname}?page=${page}&search=${value}`
        if (date) {
            url += `&date=${date.start + '/' + date.end}`
        }
        history.push(url)
    }

    handleSearchDelete = () => {
        this.setState({
            value: '',
            ownUpdate: true 
        })
        const { page, date, history, location } = this.props
        let url = `${location.pathname}?page=${page}`
        if (date) {
            url += `&date=${date.start + '/' + date.end}`
        }
        history.push(url)
    }

    render() {
        const { back, value, datesRange, dateRangeActive } = this.state
        const { importantUnreadCount, searchKeyword } = this.props
        
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
                                                {importantUnreadCount > 0 ? (
                                                    <Label
                                                    styleName='dropdown.unread-label'
                                                    size='small'
                                                    color='red'
                                                    horizontal
                                                    >
                                                    {importantUnreadCount} unread
                                                    </Label>
                                                ) : null}
                                        </h4>
                                    </div>
                                    <div styleName='dropdown.important-sub-right'>
                                        <Link to={baseNavUrl('/important/')}>
                                            <Button
                                                basic
                                                color='blue'
                                                content='Show All'
                                                styleName='dropdown.important-button'
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <Menu.Menu position='left' styleName='dropdown.flex-wrap'>
                                    <Menu.Item styleName='dropdown.date-bar'>
                                        {!dateRangeActive ? (
                                            <Form
                                                onSubmit={this.handleDateFilterSubmit} 
                                                autoComplete='off'
                                            >
                                                <DatesRangeInput
                                                    styleName='dropdown.input-bar'
                                                    name='datesRange'
                                                    placeholder='Date: From - To'
                                                    closable={true}
                                                    closeOnMouseLeave={true}
                                                    value={datesRange}
                                                    dateFormat='YYYY-MM-DD'
                                                    onChange={this.handleDateFilterChange}
                                                />
                                            </Form>
                                        ) : (
                                            <Form 
                                                onSubmit={this.handleDateFilterSubmit} 
                                                autoComplete='off'
                                            >
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
                                        )}
                                    </Menu.Item>
                                    <Menu.Item styleName='dropdown.search-menu-item'>
                                        {!searchKeyword ? (
                                            <Form onSubmit={this.handleSearchSubmit}>
                                                <Input
                                                    styleName='dropdown.input-bar dropdown.search-bar'
                                                    onChange={this.handleSearchChange}
                                                    type='text'
                                                    icon={
                                                        <Icon
                                                            name='search'
                                                            link
                                                            onClick={this.handleSearchSubmit}
                                                        />
                                                    }
                                                    value={value}
                                                />
                                            </Form>
                                        ) : (
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
                                        )} 
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

const mapStateToProps = state => {
    return {
        importantUnreadCount: state.notices.importantUnreadCount,
        searchKeyword: state.notices.searchKeyword,
        page: state.notices.page,
        date: state.notices.dateRange
    }
}

export default withRouter(connect(mapStateToProps, null)(TabList))
