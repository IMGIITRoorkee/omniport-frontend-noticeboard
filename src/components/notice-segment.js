import React from 'react';
import { Table, Container, Button, Loader, Pagination, Icon } from 'semantic-ui-react'
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
            narrow_bookmark: state.GetNotices.narrow_bookmark,
            expired: state.GetNotices.expired,
            banner_id: state.GetNotices.banner_id,
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
    GetNotices: (page, search_keyword, narrow_bookmark, expired, banner_id) => {
      dispatch(GetNotices(page, search_keyword, narrow_bookmark, expired, banner_id))
    }
  }
};


const NoticeListView = ({history, notices, total_pages, narrow_bookmark, banner_id,
                            is_fetching_notices, GetNotices, search_keyword, page, expired}) => {
    let notice_list;
    let active_page;
    let no_notices;
    let display_select_all;

    if (!is_fetching_notices) {

        notice_list = notices.map(notice_info => {
            let notice_id;

            if (!expired) {
                notice_id = notice_info.id;
            } else {
                notice_id = notice_info.noticeId;
            }

            return (
                <Notice key={notice_id}
                        id={notice_id}
                        date={notice_info.datetimeModified}
                        banner={notice_info.banner}
                        title={notice_info.title}
                        read={notice_info.read}
                        bookmark={notice_info.starred}
                        history={history}/>
            );
        });

        if (notice_list.length === 0) {
            no_notices = true;
            display_select_all = false;
        } else {
            no_notices = false;
            display_select_all = true;
        }
    } else {
        notice_list = [];
        display_select_all = false;
    }

    const handlePaginationChange = (e, { activePage }) => {
        active_page = activePage;
        GetNotices(active_page, search_keyword, narrow_bookmark, expired, banner_id);
    };


    return (

        <div styleName='notice_css.notice-list'>
            {/* Select all button */}

            <Container styleName='notice_css.select-all-container'>
                {display_select_all ? (
                <Button basic icon styleName='notice_css.select-all-button'>
                    <Icon name='square outline' color='blue'> </Icon>
                </Button> ) : (
                    <div></div>
                )}
            </Container>

            {/* Notice Table */}
            {is_fetching_notices ? (
                <Container styleName='notice_css.notice-list-view notice_css.notice-list-loading'>
                    <Loader active styleName='notice_css.loader-element'/>
                </Container>
            ) : (
                <div>
                {!no_notices ? (
                <Container styleName='notice_css.notice-list-view'>
                        <Table fixed basic singleLine compact>
                            <Table.Body>{notice_list}</Table.Body>
                        </Table>
                </Container>
                ) : (
                    <Container styleName='notice_css.notice-list-view'>
                        <div styleName='notice_css.notice-list-no-notice'>
                            <h1 styleName='no-results-found'> No results found </h1>
                        </div>
                    </Container>
                )}
                </div>
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