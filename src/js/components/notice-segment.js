import React from 'react';
import { Table, Container, Button, Loader, Pagination } from 'semantic-ui-react'
import Notice from './notice';
import "../../css/notice.css";
import { connect } from "react-redux";
import {initial_page} from "../constants/constants";
import GetNotices from "../actions/get_notices"


const mapStateToProps = state => {

    if (!state.GetNotices.is_fetching_notices) {
        return {
            notices: state.GetNotices.notices,
            total_pages: state.GetNotices.total_pages,
            is_fetching_notices: state.GetNotices.is_fetching_notices,
        };
    } else {
        return {
            is_fetching_notices: state.GetNotices.is_fetching_notices,
            total_pages: state.GetNotices.total_pages,
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



const NoticeListView = ({history, notices, total_pages, is_fetching_notices, GetNotices}) => {
    let notice_list;
    let active_page = initial_page;

    if (!is_fetching_notices) {

        notice_list = notices.map(notice_info => {
            const {id, time, date, banner, title, read, bookmark} = notice_info;

            return (
                <Notice key={id}
                        id={id}
                        time={time}
                        date={date}
                        banner={banner}
                        title={title}
                        read={read}
                        bookmark={bookmark}
                        history={history}/>
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