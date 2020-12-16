import React, { Component } from 'react'

import {
    Container,
    Divider,
    Segment,
    Header,
    Loader,
    Popup,
} from 'semantic-ui-react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import { getNotice } from '../../actions/getNotice'

import noticeView from '../../css/notice.css'


class NoticeView extends Component {
    state = {
        isOpen: false,
    }

    componentDidMount() {
        const { getNotice, match, expired } = this.props
        getNotice(match.params.noticeId, expired)
    }

    static getDerivedStateFromProps(props) {
        return {
            isFetchingNotice: props.isFetchingNotice
        };
    }

    copyUrl = () => {
        const el = document.createElement('input')
        el.value = document.location.href
        el.id = 'url-input'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        el.remove()
    }

    handleOpen = () => {
        this.setState({ isOpen: true })
        this.timeout = setTimeout(() => {
            this.setState({ isOpen: false })
        }, timeoutLength)
    }

    handleClose = () => {
        this.setState({ isOpen: false })
        clearTimeout(this.timeout)
    }

    render() {
        const { notice, isFetchingNotice, noticeExists } = this.props

        return (
            <div>
                {!isFetchingNotice ? (
                    <Container styleName='noticeView.notice-box noticeView.notice-container-width'>
                        {noticeExists ? (
                            <Segment.Group>
                                <Segment as='h5' styleName='noticeView.top-segment'>
                                    <span>Subject: {notice.title}</span>
                                    <span>{notice.banner.name}</span>
                                </Segment>
                                <Segment>
                                    <div styleName='notice-list-div'>
                                        <p styleName='noticeView.notice-posted-by'>
                                            Posted by: {notice.uploader.fullName}
                                        </p>
                                        <Popup
                                            trigger={
                                                <p
                                                    styleName='noticeView.get_shareable_link'
                                                    onClick={this.copyUrl}
                                                >
                                                    Get shareable link
                                                </p>
                                            }
                                            content={`Copied!`}
                                            on='click'
                                            hideOnScroll
                                            onClose={this.handleClose}
                                            open={this.state.isOpen}
                                            onOpen={this.handleOpen}
                                        />
                                    </div>
                                    <p>
                                        Posted on:{' '}
                                        {moment(notice.datetimeModified).format(
                                            'MMMM Do YYYY, h:mm:ss a'
                                        )}
                                    </p>
                                </Segment>

                                <Divider fitted />

                                <Container
                                    textAlign='justified'
                                    styleName='noticeView.notice-view-container'
                                >
                                    <Header as='h2' styleName='noticeView.notice-box-header'>
                                        {notice.title}
                                    </Header>
                                    <div
                                        styleName='noticeView.notice-content'
                                        dangerouslySetInnerHTML={{ __html: notice.content }}
                                    />
                                </Container>
                            </Segment.Group>
                        ) : (
                                <div>
                                    <Container styleName='noticeView.notice-list-view'>
                                        <div styleName='noticeView.notice-view-no-notice'>
                                            <h1 styleName='no-results-found'> No notice found </h1>
                                        </div>
                                    </Container>
                                </div>
                            )}
                    </Container>
                ) : (
                        <Container styleName='noticeView.notice-box noticeView.notice-view-loading noticeView.notice-container-width'>
                            <Loader active styleName='noticeView.loader-element' />
                        </Container>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notice: state.notices.notice,
        noticeExists: state.notices.noticeExists,
        isFetchingNotice: state.notices.isFetchingNotice,
        noticeId: state.notices.noticeId,
        mediaPath: state.notices.mediaPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNotice: (id, expired) => {
            dispatch(getNotice(id, expired))
        }
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoticeView))
