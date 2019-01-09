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

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
        console.log(this.state);
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
                    <Form>
                        <DatesRangeInput
                            styleName='notice_css.input-bar'
                            name="datesRange"
                            placeholder="Date: From - To"
                            iconPosition="left"
                            closeOnMouseLeave={true}
                            value={this.state.datesRange}
                            onChange={this.handleChange}/>
                    </Form>
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

export default connect(mapStateToProps) (DropdownView);