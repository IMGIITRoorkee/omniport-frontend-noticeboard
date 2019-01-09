import React, { Component } from 'react';
import { Dropdown, Form, Menu } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import 'rc-calendar/assets/index.css';
import { connect } from "react-redux";
import NoticeBookmark from "../actions/bookmark";
import {initial_page} from "../constants/constants";
import {DatesRangeInput} from 'semantic-ui-calendar-react'


const mapStateToProps = state => {
    return {
        filters: state.GetFilters.filters,
        date_range: state.GetNotices.date_range,
        search_keyword: state.GetNotices.search_keyword,
        banner_id: state.GetNotices.banner_id,
    }
};

class DropdownView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            datesRange: ''
        };
    }

    renderInnerDropdownItems(items) {
        if (items.length > 0) {
            return items.map((item, index) => (
                <Dropdown.Item key={index}
                               onClick={() => this.filterNotices(item.id, '/noticeboard/')}>
                    {item.name}
                </Dropdown.Item>
            ));
        }
        else return [];
    }

    renderOuterDropdownItems(items) {
        if (items.length > 0) {
            return items.map((item, index) => (
                <Dropdown.Item key={index}>
                    <Dropdown text={item.name} pointing='left'>
                        <Dropdown.Menu styleName='notice_css.dropdown-left'>
                            {this.renderInnerDropdownItems(item.banner)}
                            </Dropdown.Menu>
                    </Dropdown>
                </Dropdown.Item>
            ));
        }
        else return [];
    }

    handleDateFilterChange = (event, {name, value,}) => {
        if (this.state.hasOwnProperty(name)) {
            console.log(value);
            this.setState({[name]: value});
        }
    };

    handleDateFilterSubmit = (event) => {
        let dates = this.state.datesRange.split(' ');
        let start = dates[0];
        let end = dates[2];

        let date_range;

        if (dates.length === 3) {
            date_range =  {start: start, end: end};
        } else {
            date_range = null;
        }

        if (dates) {
            this.props.history.push({
                pathname: '/noticeboard/',
                state: {
                    page: initial_page,
                    search_keyword: this.props.search_keyword,
                    banner_id: this.props.banner_id,
                    date_range: date_range
                }
            });
        }
    };

    goHome(path) {
      this.props.history.push({
          pathname: path,
          state: {page: initial_page,
                  narrow_bookmark: false}});
    }

    expiredNotices(path) {
        this.props.history.push({
            pathname: path,
            state: {page: initial_page,
                    expired: true}})
    }

    filterNotices(banner_id, path) {
        console.log(this.props.date_range);
        this.props.history.push({
            pathname: path,
            state: {page: initial_page,
                    search_keyword: this.props.search_keyword,
                    date_range: this.props.date_range,
                    banner_id: banner_id}})
    }

    render () {

        return (
            <Menu.Menu position='left'>
                <Menu.Item>
                    <Dropdown text='All Notices'>
                        <Dropdown.Menu>
                            <Dropdown.Item text='All Notices'
                                           onClick={() => this.goHome('/noticeboard/')}/>

                            {this.renderOuterDropdownItems(this.props.filters)}

                            <Dropdown.Divider styleName='notice_css.dropdown-divider'/>
                            <Dropdown.Item text='Expired'
                                       onClick={() => this.expiredNotices('/noticeboard/')}/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item>
                    <Form onSubmit={this.handleDateFilterSubmit}>
                        <DatesRangeInput
                            styleName='notice_css.input-bar'
                            name="datesRange"
                            placeholder="Date: From - To"
                            iconPosition="left"
                            closable={true}
                            closeOnMouseLeave={true}
                            value={this.state.datesRange}
                            dateFormat='YYYY-MM-DD'
                            onChange={this.handleDateFilterChange}/>
                    </Form>
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

export default connect(mapStateToProps) (DropdownView);