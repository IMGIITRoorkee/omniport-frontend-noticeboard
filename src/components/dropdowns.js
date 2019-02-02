import React, { Component } from 'react';
import { Dropdown, Form, Menu, Search } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import 'rc-calendar/assets/index.css';
import { connect } from "react-redux";
import {initial_page} from "../constants/constants";
import {DatesRangeInput} from 'semantic-ui-calendar-react';



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
            datesRange: '',
            value: ''
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }


    dateFormatMatch = (dates) => {

        if (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01]) - \d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(dates)) {
            dates = dates.split(' ');
            let start = dates[0];
            let end = dates[2];

            let date_range =  {start: start, end: end};
            return date_range;
        } else {
            return null;
        }
    }

    handleDateFilterChange = (event, {name, value,}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({[name]: value});

            let date_range;
            date_range = this.dateFormatMatch(value);

            let flag = false;
            if (date_range || value === '') {
                flag = true;
            }

            if (flag) {
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
        }
    };

    handleDateFilterSubmit = () => {
        let date_range;
        date_range = this.dateFormatMatch(this.state.datesRange);

        if (true) {
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
        this.props.history.push({
            pathname: path,
            state: {page: initial_page,
                    search_keyword: this.props.search_keyword,
                    date_range: this.props.date_range,
                    banner_id: banner_id}})
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

    handleSearchChange(event) {
        this.setState({value: event.target.value});
    }

    handleSearchSubmit() {
        this.props.history.push({pathname: '/noticeboard/',
            state: {page: initial_page,
                    search_keyword: this.state.value,
                    narrow_bookmark: false,
                    banner_id: this.props.banner_id,
                    date_range: this.props.date_range,
                    expired: this.props.expired}});
    }

    render () {

        return (
            <Menu.Menu position='left'>
                <Menu.Item styleName='notice_css.date-bar'>
                    <Form onSubmit={this.handleDateFilterSubmit} autoComplete="off">
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

                <Menu.Item>
                    <Form onSubmit={this.handleSearchSubmit}>
                        <Search styleName='notice_css.input-bar notice_css.search-bar'
                            onSearchChange={this.handleSearchChange}
                            type='text'
                            showNoResults={false}
                            value={this.state.value}/>
                    </Form>
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

export default connect(mapStateToProps) (DropdownView);