import React, { Component } from 'react';
import { Button, Menu } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GetNotices from "../actions/get_notices";


const mapStateToProps = state => {
    return {
        page: state.GetNotices.page,
    }
};

const mapDispatchToProps = dispatch => {
  return {
    GetNotices: (page, search_keyword) => {
      dispatch(GetNotices(page, search_keyword))
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
      this.props.history.push({pathname: path, state: {page: this.props.page}});
    }
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (AllNoticesLink));