import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from "react-redux";
import NoticeBookmark from "../actions/bookmark";
import moment from 'moment';
import notice_css from "../css/notice.css";
import { Link } from 'react-router-dom'
import {initial_page} from "../constants/constants";



const mapStateToProps = state => {
    return {
        expired: state.GetNotices.expired,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    NoticeBookmark: (notice_id, bookmark, expired) => {
      dispatch(NoticeBookmark(notice_id, bookmark, expired))
    },
  }
};

const Notice = ({id, date, banner, title, history, read, bookmark, NoticeBookmark, expired}) => {

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
            NoticeBookmark(id, bookmark);
        }
    };

    return (
        <Table.Row styleName={read ? 'notice_css.notice-row-read notice_css.notice-row': 'notice_css.notice-row'} >
            <Table.Cell styleName={expired ? 'notice_css.cell-width-1':
                                             'notice_css.cell-width-1 notice_css.cell-hover'}>
                {expired ? (
                    <Icon name='square outline'/>
                ) : (
                    <Icon name='square outline' color='blue'/>
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