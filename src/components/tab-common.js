import React, { Component } from 'react';
import { Button, Menu } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import { connect } from "react-redux";
import {initial_page} from "../constants/constants";


const mapStateToProps = state => {
    return {
        expired: state.GetNotices.expired,
        banner_id: state.GetNotices.banner_id,
        date_range: state.GetNotices.date_range,
    };
};

class TabCommonElements extends Component {

    goHome(path) {
      this.props.history.push({pathname: path, state: {page: initial_page, narrow_bookmark: false}});
    }

    narrowBookmarks(path) {
       this.props.history.push({pathname: path, state: {page: initial_page, narrow_bookmark: true}});
    }

    render () {
        return (
            <Menu.Menu position='right'>
                <Menu.Item styleName='notice_css.menu-right'>
                    <Button basic styleName='notice_css.tab-button notice_css.menu-button-no-border'
                        onClick={() => this.narrowBookmarks('/noticeboard/')}>Bookmarks</Button>
                    <Button basic styleName='notice_css.tab-button notice_css.menu-button-border'
                        onClick={() => this.goHome('/noticeboard/')}>Home</Button>
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

export default connect(mapStateToProps) (TabCommonElements);