import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import TabCommonElements from "./tab-common";
import DropdownView from "./dropdowns";
import AllNoticesLink from "./all-notices-button";
import {Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";


const mapStateToProps = state => {
    return {
        narrow_bookmark: state.GetNotices.narrow_bookmark,
    }
};


class TabList extends Component {
    render () {
        let narrow_bookmark = this.props.narrow_bookmark;

        return (
            <Container>
                <Menu secondary>
                    {!narrow_bookmark ? (
                        <div>
                            <Route path="/noticeboard/notice" component={AllNoticesLink}/>
                            <Route exact path="/noticeboard/" component={DropdownView}/>
                        </div>
                        ) : (
                            <AllNoticesLink/>
                    )}
                    <TabCommonElements history={this.props.history}/>
                </Menu>
            </Container>
        )
    }
};


export default withRouter(connect (mapStateToProps) (TabList));