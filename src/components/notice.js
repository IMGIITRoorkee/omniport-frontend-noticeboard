import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from "react-redux";
import BookmarkNotice from "../actions/bookmark";
import moment from 'moment';
import notice_css from "../css/notice.css";
import { Link } from 'react-router-dom'



const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
  return {
    BookmarkNotice: (notice_id, bookmark) => {
      dispatch(BookmarkNotice(notice_id, bookmark))
    },
  }
};

const Notice = ({id, date, banner, title, history, read, bookmark, BookmarkNotice}) => {

    const OpenNotice = (e) => {
        history.push('/noticeboard/notice/'+id);
    };
    const bookmarkNotice = (e) => {
        bookmark = !bookmark;
        BookmarkNotice(id, bookmark);
    };

    return (
        <Table.Row styleName={read ? 'notice_css.notice-row-read': ''} >
            <Table.Cell styleName='notice_css.cell-width-1'>
                <Icon name='square outline'/>
            </Table.Cell>
            <Table.Cell styleName='notice_css.cell-width-1' onClick={bookmarkNotice}>
                {!bookmark ? (
                    <Icon name='bookmark outline'/>
                ) : (
                    <Icon name='bookmark'/>
                )}
            </Table.Cell>
            <Table.Cell styleName='notice_css.cell-width-2 notice_css.cell-hover'>
                {moment(date).format("MMM Do")}
            </Table.Cell>
            <Table.Cell width={2} onClick={OpenNotice} styleName='notice_css.cell-hover'>
                {moment(date).format("LT")}
            </Table.Cell>
            <Table.Cell width={3} onClick={OpenNotice} styleName='notice_css.cell-hover'>
                {banner.name}
            </Table.Cell>
            <Table.Cell collapsing onClick={OpenNotice} styleName='notice_css.cell-hover'>
                {title}
            </Table.Cell>
        </Table.Row>
    )
};

export default connect(mapStateToProps, mapDispatchToProps) (Notice);