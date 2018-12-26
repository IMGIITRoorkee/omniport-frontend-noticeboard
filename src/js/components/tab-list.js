import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import "../../css/notice.css";
import TabCommonElements from "./tab-common";
import DropdownView from "./dropdowns";
import AllNoticesLink from "./all-notices-button";
import { Route } from "react-router-dom";

export default class TabList extends Component {
    render () {
        return (
            <Container className='tab-list'>
                <Route path="/notice" component={AllNoticesLink}/>
                <Route exact path="/" component={DropdownView}/>
                <TabCommonElements/>
            </Container>
        )
    }

};


