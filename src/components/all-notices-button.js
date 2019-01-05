import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
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
            <div styleName='notice_css.tab-common-elements'>
                <Button basic styleName='notice_css.tab-button notice_css.tab-single-button'
                        onClick={() => this.all_notices('/noticeboard/')}
                        icon='arrow left' content='All Notices'/>
            </div>
        )
    };

    all_notices(path) {
      this.props.history.push({pathname: path, state: {page: this.props.page}});
    }
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (AllNoticesLink));