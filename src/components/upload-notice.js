import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Button,
  Icon,
  Header,
  Radio,
  Input,
  Checkbox
} from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import { uploadNotice } from '../actions/index'
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
      isImportant: false
    }
    this.modalRef = React.createRef()
  }
  handleModal = value => {
    this.setState({
      showModal: value
    })
  }
  handleRadioChange = (e, banner) => {
    this.setState({
      checkedState: banner
    })
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleEditorChange = e => {
    this.setState({
      editorContent: e.target.getContent()
    })
  }
  handleDateChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
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
    let data = {
      title: title,
      content: editorContent,
      banner: checkedState,
      expiry_date: endDate,
      is_important: isImportant
    }
    uploadNotice(data, this.successCallback)
  }
  successCallback = () => {
    console.log('here')
  }
  render() {
    const { showModal, title, checkedState, endDate, isImportant } = this.state
    const { filters } = this.props

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
              <div styleName="upload.input-width-50">
                <label>Title</label>
                <Input
                  fluid
                  placeholder="Title of notice"
                  value={title}
                  name="title"
                  onChange={this.onChange}
                />
              </div>
              <div styleName="upload.date-input-parent upload.input-width-50">
                <label>Expires On</label>
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
                />
              </div>
              <div>
                {/* <Header content="Select Catgories" as="h2" /> */}
                {filters &&
                  filters.map((filter, index) => (
                    <div key={index} styleName="upload.sub-categories-parent">
                      <Header content={filter.name} as="h3" />
                      <div styleName="upload.sub-categories-radio-parent">
                        {filter.banner &&
                          filter.banner.map((banner, index) => (
                            <Radio
                              key={index}
                              name="filter-radio"
                              label={banner.name}
                              onChange={e => this.handleRadioChange(e, banner)}
                              checked={checkedState.name === banner.name}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
              <UploadNoticeEditor
                handleEditorChange={this.handleEditorChange}
                mountedNode={this.modalRef}
              />
              <Checkbox
                styleName="upload.notice-upload-checkbox"
                checked={isImportant}
                onChange={this.handleCheckChange}
                name="isImportant"
                label="Make the notice as IMPORTANT"
              />
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleSubmit} primary>
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
    filters: state.filters.filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadNotice: (data, callback) => {
      dispatch(uploadNotice(data, callback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadNotice)
