import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import "../../css/notice.css";
import { withRouter } from "react-router-dom";

class AllNoticesLink extends Component {
    render () {
        return (
            <div className='tab-common-elements'>
                <Button basic className='tab-button tab-single-button'
                        onClick={() => this.all_notices('/')}
                        icon='arrow left' content='All Notices'/>
            </div>
        )
    };

    all_notices(path) {
      this.props.history.push(path);
    }
}

export default withRouter(AllNoticesLink);