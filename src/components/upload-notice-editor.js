import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Container } from 'semantic-ui-react'
import { Editor } from '@tinymce/tinymce-react'
import { urlFileManager } from '../urls'
import config from '../../config.json'

import editor from '../css/upload-notice-editor.css'

export default class UploadNoticeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      isConfirmModal: false,
      isConfirm: false
    }
  }
  componentDidMount() {
    var self = this
    window.addEventListener(
      'message',
      function(e) {
        if (e && e.data && e.data.file && e.data.fileName) {
          self.setState({
            data: e.data,
            isConfirmModal: true
          })
        }
      },
      false
    )
  }
  handleClick = (callback, value, meta) => {
    let self = this
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=1000px,height=500px,left=100px,top=100px`
    window.open(urlFileManager(), 'title', params)

    window.addEventListener('click', function(e) {
      if (
        self.state.data.file &&
        self.state.data.fileName &&
        self.state.isConfirm
      ) {
        callback(self.state.data.file, { title: self.state.data.fileName })
      }
    })
  }
  componentWillUnmount() {
    window.removeEventListener('message', function() {})
    window.removeEventListener('click', function() {})
  }
  closeConfirmationModal = () => {
    this.setState({
      isConfirmModal: false,
      data: ''
    })
  }
  handleConfirmation = () => {
    this.setState({
      isConfirmModal: false,
      isConfirm: true
    })
  }
  render() {
    const { isConfirmModal, data } = this.state
    const { mountedNode, handleEditorChange } = this.props
    return (
      <div styleName="editor.editor-parent">
        <Editor
          apiKey={config.apiKey}
          init={{
            plugins: 'link image code',
            toolbar: 'undo redo | link image | code',
            image_title: true,
            automatic_uploads: true,
            plugins: 'link image code',
            insert_button_items: 'image link | inserttable',
            file_picker_callback: (callback, value, meta) => {
              this.handleClick(callback, value, meta)
            },
            file_browser_callback_types: 'file image media link',
            branding: false
          }}
          onChange={handleEditorChange}
          menubar={false}
        />
        {isConfirmModal ? (
          <Modal
            size="large"
            open={isConfirmModal}
            onClose={this.closeConfirmationModal}
            mountNode={mountedNode ? mountedNode.current : null}
          >
            <Modal.Header>
              Do you really want to select "{data.fileName}"
            </Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to select this file?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.closeConfirmationModal}>
                No
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Yes"
                onClick={this.handleConfirmation}
              />
            </Modal.Actions>
          </Modal>
        ) : null}
      </div>
    )
  }
}
