import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import 'rc-calendar/assets/index.css';
import { connect } from "react-redux";
import NoticeBookmark from "../actions/bookmark";
import {initial_page} from "../constants/constants";


const mapStateToProps = state => {
    return {
        filters: state.GetFilters.filters,
    }
};

class DropdownView extends Component {

    expiredNotices(path) {
        this.props.history.push({pathname: path, state: {page: initial_page, expired: true}})
    }

    render () {

        console.log(this.props.filters);

        return (
            <div styleName='notice_css.tab-common-elements'>
                <Dropdown text='All Notices' styleName='notice_css.tab-dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item text='All Notices' />
                        <Dropdown.Item text='Authorities' />
                        <Dropdown.Item text='Departments' />
                        <Dropdown.Item text='Placement Office' />

                        <Dropdown.Divider />
                        <Dropdown.Item text='Expired'
                                       onClick={() => this.expiredNotices('/noticeboard/')}/>
                    </Dropdown.Menu>
                </Dropdown>

                 <Dropdown text='Date' styleName='notice_css.tab-dropdown'>
                </Dropdown>
            </div>
        )
    }
}

export default connect(mapStateToProps) (DropdownView);