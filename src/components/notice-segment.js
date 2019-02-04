import React from 'react';
import { Table, Container, Button, Loader, Pagination, Icon, Segment } from 'semantic-ui-react'
import Notice from './notice';
import notice_css from "../css/notice.css";
import { connect } from "react-redux";
import GetNotices from "../actions/get_notices"
import SelectAll from "../actions/select_all"
import NoticeBookmark from "../actions/bookmark";
import NoticeRead from "../actions/read";


const mapStateToProps = state => {

    if (!state.GetNotices.is_fetching_notices) {
        return {
            notices: state.GetNotices.notices,
            total_pages: state.GetNotices.total_pages,
            is_fetching_notices: state.GetNotices.is_fetching_notices,
            page: state.GetNotices.page,
            search_keyword: state.GetNotices.search_keyword,
            narrow_bookmark: state.GetNotices.narrow_bookmark,
            expired: state.GetNotices.expired,
            banner_id: state.GetNotices.banner_id,
            date_range: state.GetNotices.date_range,
            select_all_active: state.GetNotices.select_all_active,
            selected_notices: state.GetNotices.selected_notices,
            filters: state.GetFilters.filters,
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
      GetNotices: (page, search_keyword, narrow_bookmark,
                 expired, banner_id, date_range) => {
          dispatch(GetNotices(page, search_keyword, narrow_bookmark,
              expired, banner_id, date_range))
      },
      SelectAll: (select_all_active) => {
        dispatch(SelectAll(select_all_active));
        },
      NoticeBookmark: (notice_id_list, toggle) => {
        dispatch(NoticeBookmark(notice_id_list, toggle));
        },
      NoticeRead: (notice_id_list, toggle) => {
        dispatch(NoticeRead(notice_id_list, toggle));
        },
  }
};


const NoticeListView = ({history, notices, total_pages, narrow_bookmark, banner_id,
                            NoticeBookmark, NoticeRead, date_range, filters,
                            SelectAll, select_all_active, is_fetching_notices,
                            GetNotices, search_keyword, page, expired, selected_notices}) => {
    let notice_list, date_display, active_page, no_notices, display_select_all, toggle, banner_name;

    if (banner_id) {
        for (let index=0; index<filters.length; index++) {
            for (let j=0; j<filters[index].banner.length; j++){
                if (banner_id == filters[index].banner[j].id) {
                    banner_name = filters[index].banner[j].name;
                }
            }
        }
    } else {
        banner_name = null;
    }

    if (date_range) {
        date_display = date_range.start + ' to ' + date_range.end;
    }

    if (!is_fetching_notices) {
        notice_list = notices.map(notice_info => {

            return (
                <Notice key={notice_info.id}
                        id={notice_info.id}
                        is_selected={notice_info.is_selected}
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
        GetNotices(active_page, search_keyword, narrow_bookmark, expired, banner_id, date_range);
    };

    const selectAll = (e) => {
        SelectAll(!select_all_active);
    };

    const bookmark = (e) => {
         toggle = true;
         NoticeBookmark(selected_notices, toggle);
         SelectAll(false);
    };

    const remove_bookmark = (e) => {
         toggle = false;
         NoticeBookmark(selected_notices, toggle);
         SelectAll(false);
    };

    const read = (e) => {
         toggle = true;
         NoticeRead(selected_notices, toggle);
         SelectAll(false);
    };

    return (

        <div styleName='notice_css.notice-list'>
            {/* Select all button */}
            <Container styleName='notice_css.select-all-container'>
                {display_select_all ? (
                    <div >
                        {select_all_active ? (
                            <div>
                                <Button icon styleName='notice_css.select-all-button-activated notice_css.select-all-button notice_css.tab-button'
                                    onClick={selectAll}>
                                    <Icon name='square' color='blue'></Icon>
                                </Button>
                                <Segment styleName='notice_css.select-all-list notice_css.select-all-activated-list'>
                                    <Button basic styleName='notice_css.tab-button' icon onClick={read}>
                                        <Icon name='envelope open outline' color='blue' styleName='notice_css.buttons-select-all'></Icon>
                                        Mark as Read
                                    </Button>
                                    <Button basic styleName='notice_css.tab-button' icon onClick={bookmark}>
                                        <Icon name='bookmark' color='blue' styleName='notice_css.buttons-select-all'></Icon>
                                        Bookmark
                                    </Button>
                                    <Button basic styleName='notice_css.tab-button' icon onClick={remove_bookmark}>
                                        <Icon name='bookmark outline' color='blue' styleName='notice_css.buttons-select-all'></Icon>
                                        Remove Bookmark
                                    </Button>
                                </Segment>
                            </div>
                        ) : (
                            <div styleName="notice_css.table-row">
                                <Button icon styleName='notice_css.select-all-button-not-activated  notice_css.select-all-button'
                                        onClick={selectAll}>
                                    <Icon name='square outline'> </Icon>
                                </Button>
                                <Segment styleName='notice_css.select-all-list notice_css.display-filters'>
                                    <div styleName='notice_css.filter-block'> {banner_name} </div>
                                    <div styleName='notice_css.filter-block'> {date_display} </div>
                                </Segment>
                            </div>
                        )}
                    </div>
                ) : (
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