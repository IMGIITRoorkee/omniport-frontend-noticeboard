import React from 'react';
import { Table, Container, Button, Loader, Pagination } from 'semantic-ui-react'
import Notice from './notice';
import "../../css/notice.css";
import { connect } from "react-redux";
import {initial_page} from "../constants/constants";
import GetNotices from "../actions";


const mapStateToProps = state => {

    if (!state.GetNotice.is_fetching_notices) {
        return {
            notices: state.GetNotice.notices,
            total_pages: state.GetNotice.total_pages,
            is_fetching_notices: state.GetNotice.is_fetching_notices,
        };
    } else {
        return {
            is_fetching_notices: state.GetNotice.is_fetching_notices,
            total_pages: state.GetNotice.total_pages,
        };
    }
};

const mapDispatchToProps = dispatch => {
  return {
    GetNotices: (page) => {
      dispatch(GetNotices(page))
    }
  }
};



const NoticeListView = ({notices, total_pages, is_fetching_notices, GetNotices}) => {
    var notice_list;
    var active_page = 1;

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

    const handlePaginationChange = (e, { activePage }) => {
        active_page = activePage;
        GetNotices(active_page);
    };


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

            <Container className='pagination'>
                 <Pagination totalPages={total_pages}
                             firstItem={null}
                             onPageChange={handlePaginationChange}
                             defaultActivePage={active_page}
                             lastItem={null} />
            </Container>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps) (NoticeListView);