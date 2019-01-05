import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {

    console.log(state);
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
      this.props.history.push(path);
    }
}

export default withRouter(AllNoticesLink);