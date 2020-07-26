import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import CreateModal from './notice-modal'

import upload from '../css/upload-notice.css'
export default class UploadNotice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.modalRef = React.createRef()
  }
  handleModal = value => {
    this.setState({
      showModal: value
    })
  }
  render() {
    const { showModal } = this.state
    return (
      <React.Fragment>
        <Button styleName="upload.upload-btn" onClick={() => this.handleModal(true)} primary>
          Upload
        </Button>
        <div styleName="upload.modal-mount-parent" ref={this.modalRef}></div>
        {showModal ? (
          <CreateModal
            modalRef={this.modalRef}
            modalType="create"
            handleModal={this.handleModal}
            modal={showModal}
          />
        ) : null}
      </React.Fragment>
    )
  }
}
