import React, { Component } from 'react';
import { Dropdown, Menu, Divider, Icon } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import 'rc-calendar/assets/index.css';
import { connect } from "react-redux";
import NoticeBookmark from "../actions/bookmark";
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

class SideNav extends Component {

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

    narrowBookmarks(path) {
       this.props.history.push({pathname: path, state: {page: initial_page, narrow_bookmark: true}});
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
        else {
            return [];
        }
    }

    renderOuterDropdownItems(items) {
        if (items.length > 0) {
            return items.map((item, index) => (
                <Dropdown styleName="notice_css.sidenav-items" item text={item.name} key={index} scrolling={true}>
                    <Dropdown.Menu>
                        {this.renderInnerDropdownItems(item.banner)}
                    </Dropdown.Menu>
                </Dropdown>
            ));
        }
        else return [];
    }

    render () {

        return (
            <Menu secondary vertical inverted attached styleName='notice_css.sidenav-menu' color={'blue'}>
                <Menu.Item
                    name='All Notices'
                    onClick={() => this.goHome('/noticeboard/')}>
                    All Notices
                </Menu.Item>

                {this.renderOuterDropdownItems(this.props.filters)}

                <Divider styleName="notice_css.sidenav-divider"/>

                <Menu.Item
                    name='Expired'
                    onClick={() => this.expiredNotices('/noticeboard/')}>
                    Expired
                </Menu.Item>

                <Divider styleName="notice_css.sidenav-divider"/>

                <Menu.Item
                    name='Bookmarks'
                    onClick={() => this.narrowBookmarks('/noticeboard/')}>
                    Bookmarks
                </Menu.Item>

            </Menu>
        )
    }
}

export default connect(mapStateToProps) (SideNav);