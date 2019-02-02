import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from "react-redux";
import NoticeBookmark from "../actions/bookmark";
import moment from 'moment';
import notice_css from "../css/notice.css";
import { Link } from 'react-router-dom'
import {initial_page} from "../constants/constants";
import ToggleSelect from "../actions/toggle_select";



const mapStateToProps = state => {
    return {
        expired: state.GetNotices.expired,
        select_all_active: state.GetNotices.select_all_active
    };
};

const mapDispatchToProps = dispatch => {
  return {
    NoticeBookmark: (notice_id_list, bookmark) => {
        dispatch(NoticeBookmark(notice_id_list, bookmark));
    },
    ToggleSelect: (notice_id, is_selected) => {
        dispatch(ToggleSelect(notice_id, is_selected));
    }
  }
};

const Notice = ({id, date, banner, title, is_selected, select_all_active, ToggleSelect,
                    history, read, bookmark, NoticeBookmark, expired}) => {

    const OpenNotice = (e) => {
        let path;
        if (expired) {
            path = '/noticeboard/notice/old/'+id;
        } else {
            path = '/noticeboard/notice/'+id;
        }
        history.push({pathname: path, state: {page: initial_page, expired: expired}});
    };

    const bookmarkNotice = (e) => {
        bookmark = !bookmark;
        if (!expired) {
            NoticeBookmark([id], bookmark);
        }
    };

    const selectNotice = (e) => {
        is_selected = !is_selected;
        ToggleSelect(id, is_selected);
    };

    return (
        <Table.Row styleName={read ? 'notice_css.notice-row-read notice_css.notice-row': 'notice_css.notice-row-unread notice_css.notice-row'}>
            <Table.Cell styleName={expired ? 'notice_css.cell-width-1':
                                             'notice_css.cell-width-1 notice_css.cell-hover'}
                        onClick={selectNotice}>
                {expired ? (
                    <Icon name='square outline'/>
                ) : (
                    <Icon name={is_selected ? 'square': 'square outline'}
                          color={is_selected ? 'blue': 'grey'}
                    />
                )}
            </Table.Cell>
            <Table.Cell styleName={expired ? 'notice_css.cell-width-1':
                                             'notice_css.cell-width-1 notice_css.cell-hover'}
                        onClick={bookmarkNotice}>
                {expired ? (
                    <Icon name='bookmark outline'/>
                ) : (
                    <Icon name={bookmark ? 'bookmark': 'bookmark outline'} color='yellow'/>
                )}
            </Table.Cell>
            <Table.Cell onClick={OpenNotice} styleName='notice_css.cell-width-2 notice_css.cell-hover'>
                {moment(date).format("MMM Do")}
            </Table.Cell>
            <Table.Cell onClick={OpenNotice} styleName='notice_css.cell-width-2 notice_css.cell-hover'>
                {moment(date).format("LT")}
            </Table.Cell>
            <Table.Cell collapsing onClick={OpenNotice} styleName='notice_css.cell-width-3 notice_css.cell-hover'>
                {banner.name}
            </Table.Cell>
            <Table.Cell collapsing onClick={OpenNotice} styleName='notice_css.cell-hover'>
                {title}
            </Table.Cell>
        </Table.Row>
    )
};

export default connect(mapStateToProps, mapDispatchToProps) (Notice);