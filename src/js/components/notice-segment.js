import React, { Component } from 'react';
import { Table, Container, Button } from 'semantic-ui-react'
import Notice from './notice';
import Pagination from "./pagination";
import "../../css/notice.css"

export default class NoticeListView extends Component {
    render() {
        return (
                <div className='notice-list-container'>
                    {/* Select all button */}
                    <Container className='select-all-container'>
                        <Button basic content='Select all' icon='square outline' labelPosition='left' />
                    </Container>

                    {/* Notice Table */}
                    <Container>
                        <Table basic compact>
                            <Table.Body>
                                <Notice/>
                                <Notice/>
                                <Notice/>
                                <Notice/>
                                <Notice/>
                                <Notice/>
                                <Notice/>
                                <Notice/>
                                <Notice/>
                                <Notice/>
                            </Table.Body>
                        </Table>
                    </Container>

                    <Pagination/>
                </div>
        )
    }
}