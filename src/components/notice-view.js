import React, { Component } from 'react'
import {
  Container,
  Divider,
  Segment,
  Header,
  Loader,
  Popup
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment'

import noticeView from '../css/notice.css'

const timeoutLength = 1000

class NoticeView extends Component {
  state = { isOpen: false }

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
          <Container styleName="noticeView.notice-box noticeView.notice-container-width">
            {noticeExists ? (
              <Segment.Group>
                <Segment as="h5" styleName='noticeView.top-segment'>
                  <span>Subject: {notice.title}</span>
                  <span>{notice.banner.name}</span>
                </Segment>
                <Segment>
                  <div styleName="notice-list-div">
                    <p styleName="noticeView.notice-posted-by">
                      Posted by: {notice.uploader.fullName}
                    </p>
                    <Popup
                      trigger={
                        <p
                          styleName="noticeView.get_shareable_link"
                          onClick={this.copyUrl}
                        >
                          Get shareable link
                        </p>
                      }
                      content={`Copied!`}
                      on="click"
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
                  textAlign="justified"
                  styleName="noticeView.notice-view-container"
                >
                  <Header as="h2" styleName="noticeView.notice-box-header">
                    {notice.title}
                  </Header>
                  <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                </Container>
              </Segment.Group>
            ) : (
              <div>
                <Container styleName="noticeView.notice-list-view">
                  <div styleName="noticeView.notice-view-no-notice">
                    <h1 styleName="no-results-found"> No notice found </h1>
                  </div>
                </Container>
              </div>
            )}
          </Container>
        ) : (
          <Container styleName="noticeView.notice-box noticeView.notice-view-loading noticeView.notice-container-width">
            <Loader active styleName="noticeView.loader-element" />
          </Container>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notice: state.notice.notice,
    noticeExists: state.notice.noticeExists,
    isFetchingNotice: state.notice.isFetchingNotice,
    noticeId: state.notice.noticeId
  }
}

export default connect(mapStateToProps)(NoticeView)
