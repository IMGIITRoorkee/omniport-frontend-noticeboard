import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import notice_css from "../css/notice.css";
import TabCommonElements from "./tab-common";
import DropdownView from "./dropdowns";
import AllNoticesLink from "./all-notices-button";
import { Route } from "react-router-dom";

export default class TabList extends Component {
    render () {
        return (
            <Container styleName='notice_css.tab-list'>
                <Route path="/noticeboard/notice" component={AllNoticesLink}/>
                <Route exact path="/noticeboard/" component={DropdownView}/>
                <TabCommonElements history={this.props.history}/>
            </Container>
        )
    }

};


