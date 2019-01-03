import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from "react-redux";
import BookmarkNotice from "../actions/bookmark";

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

const Notice = ({id, time, date, banner, title, history, read, bookmark, BookmarkNotice}) => {

    const notice_info = {id, time, date, banner, title, read, bookmark};

    const OpenNotice = (e) => {
        history.push('/notice/'+id);
    };
    const bookmarkNotice = (e) => {
        bookmark = !bookmark;
        BookmarkNotice(id, bookmark);
    };

    return (
        <Table.Row className={read ? 'notice-row-read': ''} >
            <Table.Cell className='cell-width-1'>
                <Icon name='square outline'/>
            </Table.Cell>
            <Table.Cell className='cell-width-1' onClick={bookmarkNotice}>
                {bookmark ? (
                    <Icon name='bookmark outline'/>
                ) : (
                    <Icon name='bookmark'/>
                )}
            </Table.Cell>
            <Table.Cell className='cell-width-2 cell-hover'>
                {time}
            </Table.Cell>
            <Table.Cell width={2} onClick={OpenNotice} className='cell-hover'>
                {date}
            </Table.Cell>
            <Table.Cell width={3} onClick={OpenNotice} className='cell-hover'>
                {banner}
            </Table.Cell>
            <Table.Cell collapsing onClick={OpenNotice} className='cell-hover'>
                {title}
            </Table.Cell>
        </Table.Row>
    )
};

export default connect(mapStateToProps, mapDispatchToProps) (Notice);