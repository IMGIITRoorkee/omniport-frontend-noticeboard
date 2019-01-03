import React, { Component } from 'react';
import { Container, Divider, Segment, Header, Loader } from 'semantic-ui-react';
import "../../css/notice.css";
import { Editor } from '@tinymce/tinymce-react';
import { connect } from "react-redux";
import GetNotice from "../actions/get_notice";


const mapStateToProps = state => {

    if (!state.GetNotice.is_fetching_notice) {
        return {
            notice: state.GetNotice.notice,
            is_fetching_notice: state.GetNotice.is_fetching_notice,
        };
    } else {
        return {
            is_fetching_notice: state.GetNotice.is_fetching_notice,
            notice_id: state.GetNotice.notice_id,
        };
    }
};


class NoticeView extends Component {


    render () {
        const notice = this.props.notice;
        const is_fetching_notice = this.props.is_fetching_notice;

        return (
          <div>
                {!is_fetching_notice ? (
                    <Container className="notice-box">
                    <Segment.Group raised>
                        <Segment as='h5'>Subject: {notice.title} </Segment>

                        <Segment>
                            <p className="notice-posted-by">Posted by: {notice.banner}</p>
                            <p>Posted on: {notice.date} {notice.time}</p>
                        </Segment>

                        <Divider fitted/>

                        <Container textAlign='justified' className="notice-view-container">
                            <Header as='h2' className='notice-box-header'>{notice.title}</Header>
                            <p>{notice.content}</p>
                        </Container>
                    </Segment.Group>
                    </Container>
                ) : (
                    <Container className="notice-box notice-view-loading">
                       <Loader active className='loader-element'/>
                    </Container>
                )
             }
          </div>
    )}
}

export default connect(mapStateToProps) (NoticeView);