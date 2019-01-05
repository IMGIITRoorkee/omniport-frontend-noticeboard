import React from 'react';
import { Table, Container, Button, Loader, Pagination } from 'semantic-ui-react'
import Notice from './notice';
import notice_css from "../css/notice.css";
import { connect } from "react-redux";
import GetNotices from "../actions/get_notices"


const mapStateToProps = state => {

    if (!state.GetNotices.is_fetching_notices) {
        return {
            notices: state.GetNotices.notices,
            total_pages: state.GetNotices.total_pages,
            page: state.GetNotices.page,
            search_keyword: state.GetNotices.search_keyword,
            is_fetching_notices: state.GetNotices.is_fetching_notices,
        };
    } else {
        return {
            is_fetching_notices: state.GetNotices.is_fetching_notices,
            search_keyword: state.GetNotices.search_keyword,
            page: state.GetNotices.page,
            total_pages: state.GetNotices.total_pages,
        };
    }
};

const mapDispatchToProps = dispatch => {
  return {
    GetNotices: (page, search_keyword) => {
      dispatch(GetNotices(page, search_keyword))
    }
  }
};


const NoticeListView = ({history, notices, total_pages, is_fetching_notices, GetNotices, search_keyword, page}) => {
    let notice_list;
    let active_page;
    let no_notices;

    if (!is_fetching_notices) {

        notice_list = notices.map(notice_info => {
            const {id, banner, datetimeModified, title, read, starred} = notice_info;

            return (
                <Notice key={id}
                        id={id}
                        date={datetimeModified}
                        banner={banner}
                        title={title}
                        read={read}
                        bookmark={starred}
                        history={history}/>
            );
        });

        if (notice_list.length === 0) {
            no_notices = true;
        } else {
            no_notices = false;
        }
    } else {
        notice_list = [];
    }

    const handlePaginationChange = (e, { activePage }) => {
        active_page = activePage;
        GetNotices(active_page, search_keyword);
    };


    return (

        <div styleName='notice_css.notice-list'>
            {/* Select all button */}
            <Container styleName='notice_css.select-all-container'>
                <Button basic content='Select all' icon='square outline' labelPosition='left' />
            </Container>

            {/* Notice Table */}
            {is_fetching_notices ? (
                <Container styleName='notice_css.notice-list-view notice_css.notice-list-loading'>
                    <Loader active styleName='notice_css.loader-element'/>
                </Container>
            ) : (
                <Container styleName='notice_css.notice-list-view'>
                    {!no_notices ? (
                        <Table basic compact>
                            <Table.Body>{notice_list}</Table.Body>
                        </Table>
                    ) : (
                        <p> NO NOTICES</p>
                    )}
                </Container>
            )}

            <Container styleName='notice_css.pagination-box'>
                 <Pagination styleName='notice_css.pagination'
                             totalPages={total_pages}
                             firstItem={null}
                             onPageChange={handlePaginationChange}
                             defaultActivePage={page}
                             lastItem={null}/>
            </Container>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps) (NoticeListView);