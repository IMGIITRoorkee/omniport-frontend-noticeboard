import React, { Component } from 'react';
import { Button, Menu } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GetNotices from "../actions/get_notices";
import {initial_page} from "../constants/constants";


const mapStateToProps = state => {
    return {
        page: state.GetNotices.page,
        search_keyword: state.GetNotices.search_keyword,
        narrow_bookmark: state.GetNotices.narrow_bookmark,
        expired: state.GetNotices.expired,
        banner_id: state.GetNotices.banner_id,
    }
};

const mapDispatchToProps = dispatch => {
  return {
    GetNotices: (page, search_keyword, narrow_bookmark, expired, banner_id) => {
      dispatch(GetNotices(page, search_keyword, narrow_bookmark, expired, banner_id))
    }
  }
};

class AllNoticesLink extends Component {
    render () {
        return (
            <Menu.Menu position='left'>
                <Menu.Item>
                <Button basic styleName='notice_css.tab-button'
                        onClick={() => this.all_notices('/noticeboard/')}
                        icon='arrow left' content='All Notices'/>
                </Menu.Item>
            </Menu.Menu>
        )
    };

    all_notices(path) {
      this.props.history.push({
          pathname: path,
          state: {page: this.props.page,
                  search_keyword: this.props.search_keyword,
                  narrow_bookmark: this.props.narrow_bookmark,
                  banner_id: this.props.banner_id,
                  expired: this.props.expired
          }});
    }
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (AllNoticesLink));