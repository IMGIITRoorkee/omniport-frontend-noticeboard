import React from 'react';
import { Table, Container, Button } from 'semantic-ui-react'
import Notice from './notice';
import Pagination from "./pagination";
import "../../css/notice.css";
import { connect } from "react-redux";


const NoticeListView = (props) => {
    const {notices} = props;

    const notice_list = notices.map(notice_info => {
        const {id, time, date, banner, title} = notice_info;

        return (
            <Notice key={id}
                    time={time}
                    date={date}
                    banner={banner}
                    title={title}/>
        );
    });


    return (
        <div className='notice-list'>
            {/* Select all button */}
            <Container className='select-all-container'>
                <Button basic content='Select all' icon='square outline' labelPosition='left' />
            </Container>

            {/* Notice Table */}
            <Container className='notice-list-view'>
                <Table basic compact>
                    <Table.Body>
                        {notice_list}
                    </Table.Body>
                </Table>
            </Container>

            <Pagination/>
        </div>
    );
};

export default NoticeListView;