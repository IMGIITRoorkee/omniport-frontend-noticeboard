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
  Message
} from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import { uploadNotice, getNotices } from '../actions/index'
import UploadNoticeEditor from './upload-notice-editor'

import upload from '../css/upload-notice.css'
class UploadNotice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      editorContent: '',
      title: '',
      checkedState: '',
      endDate: '',
      isImportant: false,
      titleError: false,
      endDateError: false,
      bannerError: false,
      editorError: false,
      showImpCheck: false
    }
    this.modalRef = React.createRef()
  }
  handleModal = value => {
    this.setState({
      showModal: value
    })
  }
  handleRadioChange = (e, permission) => {
    this.setState({
      checkedState: permission,
      bannerError: false,
      showImpCheck: permission.isSuperUploader ? true : false
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
  handleCheckChange = () => {
    this.setState({
      isImportant: !this.state.isImportant
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    const {
      title,
      checkedState,
      editorContent,
      endDate,
      isImportant
    } = this.state
    const { uploadNotice } = this.props

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

    if (editorContent.trim() === '') {
      this.setState({
        editorError: true
      })
      return
    }

    let data = {
      title: title,
      content: editorContent,
      banner: checkedState.banner,
      expiry_date: endDate,
      is_important: isImportant
    }

    uploadNotice(data, this.successCallback)
  }
  successCallback = () => {
    this.setState({
      showModal: false,
      title: '',
      editorContent: '',
      endDate: '',
      checkedState: ''
    })
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
  }
  render() {
    const {
      showModal,
      title,
      checkedState,
      endDate,
      isImportant,
      titleError,
      editorError,
      endDateError,
      bannerError,
      showImpCheck
    } = this.state
    const { isUploading, permission } = this.props
    const dateCurrent = new Date()
    dateCurrent.setDate(dateCurrent.getDate() + 1)
    return (
      <React.Fragment>
        <Button onClick={() => this.handleModal(true)} primary>
          Upload
        </Button>
        <div styleName="upload.modal-mount-parent" ref={this.modalRef}></div>
        {showModal ? (
          <Modal
            open={showModal}
            onClose={() => this.handleModal(false)}
            closeIcon
          >
            <Modal.Header>Create Notice</Modal.Header>

            <Modal.Content>
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
                      <Header
                        content={permission.banner.parentCategory.name}
                        as="h3"
                      />
                      <div styleName="upload.sub-categories-radio-parent">
                        {permission.banner ? (
                          <Radio
                            key={index}
                            name="permission-radio"
                            label={permission.banner.name}
                            onChange={e =>
                              this.handleRadioChange(e, permission)
                            }
                            checked={
                              checkedState.banner &&
                              checkedState.banner.name ===
                                permission.banner.name
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                  ))}
              </div>
              {editorError ? (
                <Message error content={`Editor Content is empty!`} />
              ) : null}
              <UploadNoticeEditor
                handleEditorChange={this.handleEditorChange}
                mountedNode={this.modalRef}
              />
              {showImpCheck ? (
                <Checkbox
                  styleName="upload.notice-upload-checkbox"
                  checked={isImportant}
                  onChange={this.handleCheckChange}
                  name="isImportant"
                  label="Make the notice as IMPORTANT"
                />
              ) : null}
            </Modal.Content>
            <Modal.Actions>
              <Button loading={isUploading} onClick={this.handleSubmit} primary>
                Create <Icon name="chevron right" />
              </Button>
            </Modal.Actions>
          </Modal>
        ) : null}
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
    permission: state.permission.permission
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadNotice)
