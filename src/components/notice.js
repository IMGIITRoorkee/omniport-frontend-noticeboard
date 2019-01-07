import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from "react-redux";
import NoticeBookmark from "../actions/bookmark";
import moment from 'moment';
import notice_css from "../css/notice.css";
import { Link } from 'react-router-dom'



const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
  return {
    NoticeBookmark: (notice_id, bookmark) => {
      dispatch(NoticeBookmark(notice_id, bookmark))
    },
  }
};

const Notice = ({id, date, banner, title, history, read, bookmark, NoticeBookmark}) => {

    const OpenNotice = (e) => {
        history.push('/noticeboard/notice/'+id);
    };

    const bookmarkNotice = (e) => {
        bookmark = !bookmark;
        NoticeBookmark(id, bookmark);
    };

    return (
        <Table.Row styleName={read ? 'notice_css.notice-row-read notice_css.notice-row': 'notice_css.notice-row'} >
            <Table.Cell styleName='notice_css.cell-width-1 notice_css.cell-hover'>
                <Icon name='square outline' color='blue'/>
            </Table.Cell>
            <Table.Cell styleName='notice_css.cell-width-1 notice_css.cell-hover' onClick={bookmarkNotice}>
                {!bookmark ? (
                    <Icon name='bookmark outline' color='yellow'/>
                ) : (
                    <Icon name='bookmark' color='yellow'/>
                )}
            </Table.Cell>
            <Table.Cell styleName='notice_css.cell-width-2 notice_css.cell-hover'>
                {moment(date).format("MMM Do")}
            </Table.Cell>
            <Table.Cell onClick={OpenNotice} styleName='notice_css.cell-width-2 notice_css.cell-hover'>
                {moment(date).format("LT")}
            </Table.Cell>
            <Table.Cell onClick={OpenNotice} styleName='notice_css.cell-width-3 notice_css.cell-hover'>
                {banner.name}
            </Table.Cell>
            <Table.Cell collapsing onClick={OpenNotice} styleName='notice_css.cell-hover'>
                {title}
            </Table.Cell>
        </Table.Row>
    )
};

export default connect(mapStateToProps, mapDispatchToProps) (Notice);