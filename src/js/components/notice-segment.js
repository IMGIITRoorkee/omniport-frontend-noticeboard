import React from 'react';
import { Table, Container, Button, Loader } from 'semantic-ui-react'
import Notice from './notice';
import Pagination from "./pagination";
import "../../css/notice.css";
import { connect } from "react-redux";


const mapStateToProps = state => {

    if (!state.GetNotice.is_fetching_notices) {
        return {
            notices: state.GetNotice.notices,
            is_fetching_notices: state.GetNotice.is_fetching_notices,
        };
    } else {
        return {
            is_fetching_notices: state.GetNotice.is_fetching_notices,
        };
    }
};

const NoticeListView = ({notices, is_fetching_notices}) => {
    var notice_list;

    if (!is_fetching_notices) {
        notice_list = notices.map(notice_info => {
            const {id, time, date, banner, title} = notice_info;

            return (
                <Notice key={id}
                        time={time}
                        date={date}
                        banner={banner}
                        title={title}/>
            );
        });
    } else {
        notice_list = [];
    }


    return (

        <div className='notice-list'>
            {/* Select all button */}
            <Container className='select-all-container'>
                <Button basic content='Select all' icon='square outline' labelPosition='left' />
            </Container>

            {/* Notice Table */}
            {is_fetching_notices ? (
                <Container className='notice-list-view notice-list-loading'>
                    <Loader active className='loader-element'/>
                </Container>
            ) : (
                <Container className='notice-list-view'>
                    <Table basic compact>
                        <Table.Body>{notice_list}</Table.Body>
                    </Table>
                </Container>
            )}

            <Pagination/>
        </div>
    );
};

export default connect(mapStateToProps) (NoticeListView);