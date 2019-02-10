import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import DropdownView from "./dropdowns";
import BackLink from "./all-notices-button";
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
            <Container styleName='notice_css.notice-container-width'>
                <Menu secondary styleName='notice_css.top-bar'>
                    {!narrow_bookmark ? (
                        <div>
                            <Route path="/noticeboard/notice" component={BackLink}/>
                            <Route exact path="/noticeboard/" component={DropdownView}/>
                        </div>
                        ) : (
                            <BackLink/>
                    )}
                </Menu>
            </Container>
        )
    }
};


export default withRouter(connect (mapStateToProps) (TabList));