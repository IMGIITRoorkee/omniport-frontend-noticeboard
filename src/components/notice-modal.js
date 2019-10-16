import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Button,
  Icon,
  Header,
  Radio,
  Input,
  Checkbox,
  Responsive,
  Message,
  Loader,
  Dimmer
} from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import {
  uploadNotice,
  getNotices,
  getNotice,
  editNotice
} from '../actions/index'
import NoticeEditor from './upload-notice-editor'

import upload from '../css/upload-notice.css'
class NoticeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: '',
      title: '',
      checkedState: '',
      endDate: '',
      isImportant: false,
      titleError: false,
      endDateError: false,
      bannerError: false,
      editorError: false,
      showImpCheck: false,
      isSendEmail: true
    }
    this.modalRef = React.createRef()
  }

  componentDidMount() {
    const { modalType, id, getNotice } = this.props
    if (modalType === 'edit') {
      getNotice(id, this.successNoticeCallback)
    }
  }

  successNoticeCallback = () => {
    const { notice, normalPer } = this.props
    let tmpNotice = notice.notice
    let tempCheck = false

    for (let i = 0; i < normalPer.length; i++) {
      if (
        normalPer[i].banner.id === tmpNotice.banner.id &&
        normalPer[i].banner.isSuperUploader
      ) {
        tempCheck = true
      }
    }

    this.setState({
      title: tmpNotice.title,
      editorContent: tmpNotice.content,
      checkedState: tmpNotice.banner,
      isImportant: tmpNotice.isImportant,
      endDate: tmpNotice.expiryDate,
      showImpCheck: tempCheck,
      isSendEmail: notice.sendEmail
    })
  }

  handleModal = value => {
    this.props.handleModal(value)
  }
  handleRadioChange = (e, permission) => {
    this.setState({
      checkedState: permission.banner,
      bannerError: false,
      showImpCheck: permission.banner.isSuperUploader ? true : false
    })
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + 'Error']: false
    })
  }
  handleEditorChange = e => {
    let content = e.target.getContent()
    this.setState({
      editorContent: content,
      editorError: content === '' ? true : false
    })
  }
  handleDateChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value, [name + 'Error']: false })
    }
  }
  handleCheckChange = (event, { name, value }) => {
    this.setState({
      [name]: !this.state[name]
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const {
      title,
      checkedState,
      editorContent,
      endDate,
      isImportant,
      isSendEmail
    } = this.state
    const { uploadNotice, editNotice, modalType, id } = this.props

    if (title.trim() === '') {
      this.setState({
        titleError: true
      })
      return
    }

    if (endDate === '') {
      this.setState({
        endDateError: true
      })
      return
    }

    if (checkedState === '') {
      this.setState({
        bannerError: true
      })
      return
    }

    if (editorContent && editorContent.trim() === '') {
      this.setState({
        editorError: true
      })
      return
    }
    let data = {
      title: title,
      content: editorContent,
      banner: checkedState,
      expiry_date: endDate,
      is_important: isImportant,
      send_email: isSendEmail
    }

    modalType === 'edit'
      ? editNotice(id, data, this.successCallback)
      : uploadNotice(data, this.successCallback)
  }
  successCallback = () => {
    const {
      narrowBookmark,
      bannerId,
      dateRange,
      mainCategorySlug,
      getNotices,
      searchKeyword,
      expired,
      showImp,
      page
    } = this.props
    getNotices(
      page,
      searchKeyword,
      narrowBookmark,
      expired,
      bannerId,
      mainCategorySlug,
      dateRange,
      showImp
    )
    this.setState(
      {
        title: '',
        editorContent: '',
        endDate: '',
        checkedState: ''
      },
      this.props.handleModal(false)
    )
  }
  render() {
    const {
      title,
      checkedState,
      endDate,
      isImportant,
      titleError,
      editorError,
      endDateError,
      bannerError,
      showImpCheck,
      editorContent,
      isSendEmail
    } = this.state
    const {
      isUploading,
      permission,
      modalType,
      modalRef,
      notice,
      modal
    } = this.props
    const { isFetchingNotice } = notice

    const dateCurrent = new Date()
    dateCurrent.setDate(dateCurrent.getDate() + 1)

    return (
      <React.Fragment>
        <Modal
          open={modal}
          onClose={() => this.handleModal(false)}
          size="large"
          closeIcon
        >
          <Modal.Header>
            {modalType === 'edit' ? 'Edit Notice' : 'Create Notice'}
          </Modal.Header>
          {(modalType === 'edit' && !isFetchingNotice) ||
          modalType === 'create' ? (
            <Modal.Content scrolling>
              <div styleName="upload.display-flex">
                <div styleName="upload.input-width">
                  <label>
                    Title<span styleName="upload.field-required">*</span>
                  </label>
                  <Input
                    fluid
                    placeholder="Title of notice"
                    value={title}
                    name="title"
                    onChange={this.onChange}
                    styleName="upload.margin-above"
                  />
                  {titleError ? (
                    <Message
                      error
                      content={`Field is empty or invalid title`}
                    />
                  ) : null}
                </div>
                <div styleName="upload.input-width">
                  <label>
                    Expires On<span styleName="upload.field-required">*</span>
                  </label>
                  <Responsive {...Responsive.onlyMobile}>
                    <DateInput
                      closable
                      name="endDate"
                      minDate={dateCurrent}
                      placeholder="Expires on"
                      value={endDate}
                      iconPosition="left"
                      inline
                      required
                      dateFormat="YYYY-MM-DD"
                      onChange={this.handleDateChange}
                    />
                  </Responsive>
                  <Responsive minWidth={Responsive.onlyMobile.maxWidth + 1}>
                    <DateInput
                      closable
                      fluid
                      popupPosition="bottom center"
                      name="endDate"
                      minDate={new Date()}
                      placeholder="Expires on"
                      value={endDate}
                      iconPosition="left"
                      required
                      dateFormat="YYYY-MM-DD"
                      onChange={this.handleDateChange}
                      styleName="upload.margin-above"
                    />
                  </Responsive>
                  {endDateError ? (
                    <Message
                      error
                      content={`Field is empty or invalid expiry date`}
                    />
                  ) : null}
                </div>
              </div>
              <div styleName="upload.category-div-margin">
                {bannerError ? (
                  <Message
                    error
                    content={`Choose a category`}
                    styleName="upload.banner-error"
                  />
                ) : null}
                {permission &&
                  permission.map((permission, index) => (
                    <div key={index} styleName="upload.sub-categories-parent">
                      <Header content={permission.groupName} as="h3" />
                      <div styleName="upload.sub-categories-radio-parent">
                        {permission.child.length > 0 &&
                          permission.child.map((child, index) => (
                            <Radio
                              key={index}
                              styleName="upload.radio-buttons-margin"
                              name="permission-radio"
                              label={child.banner.name}
                              onChange={e => this.handleRadioChange(e, child)}
                              checked={checkedState.name === child.banner.name}
                            ></Radio>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
              {editorError ? (
                <Message error content={`Editor Content is empty!`} />
              ) : null}
              <NoticeEditor
                handleEditorChange={this.handleEditorChange}
                mountedNode={modalRef}
                content={editorContent}
              />
              <div styleName="upload.checkbox-parent">
                {showImpCheck ? (
                  <Checkbox
                    styleName="upload.notice-upload-checkbox"
                    checked={isImportant}
                    onChange={this.handleCheckChange}
                    name="isImportant"
                    label="Make the notice as IMPORTANT"
                  />
                ) : null}
                <Checkbox
                  styleName="upload.notice-send-email-checkbox"
                  checked={isSendEmail}
                  onChange={this.handleCheckChange}
                  name="isSendEmail"
                  label="Send Email"
                />
              </div>
            </Modal.Content>
          ) : (
            <Dimmer active inverted>
              <Loader size="medium">Loading</Loader>
            </Dimmer>
          )}
          <Modal.Actions>
            <Button
              loading={isUploading}
              onClick={this.handleSubmit}
              primary
              disabled={(modalType === 'edit' && isFetchingNotice) || false}
            >
              {modalType !== 'edit' ? 'Create' : 'Edit'}
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    showImp: state.allNotices.showImp,
    totalPages: state.allNotices.totalPages,
    isFetchingNotices: state.allNotices.isFetchingNotices,
    page: state.allNotices.page,
    expired: state.allNotices.expired,
    searchKeyword: state.allNotices.searchKeyword,
    narrowBookmark: state.allNotices.narrowBookmark,
    isUploading: state.allNotices.isUploading,
    permission: state.permission.permission,
    normalPer: state.permission.normalPer,
    notice: state.notice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotices: (
      page,
      searchKeyword,
      narrowBookmark,
      expired,
      bannerId,
      mainCategorySlug,
      dateRange,
      showImp
    ) => {
      dispatch(
        getNotices(
          page,
          searchKeyword,
          narrowBookmark,
          expired,
          bannerId,
          mainCategorySlug,
          dateRange,
          showImp
        )
      )
    },
    uploadNotice: (data, callback) => {
      dispatch(uploadNotice(data, callback))
    },
    editNotice: (id, data, callback) => {
      dispatch(editNotice(id, data, callback))
    },
    getNotice: (noticeId, callback) => {
      dispatch(getNotice(noticeId, callback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeModal)