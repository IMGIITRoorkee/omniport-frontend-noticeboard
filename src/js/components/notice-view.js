import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import "../../css/notice.css";

export default class NoticeView extends Component {
    render () {
        return (
            <Container>
                <Header as='h5' attached='top'>
                    Subject: Schedule for interview
                </Header>
            </Container>
        )
    }
}