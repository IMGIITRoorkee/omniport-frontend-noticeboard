import React, { Component } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react'
import { Editor } from '@tinymce/tinymce-react'
import { urlFileManager } from '../urls'
import { copyMedia } from '../actions/index'
import config from '../../config.json'

import editor from '../css/upload-notice-editor.css'

export default class UploadNoticeEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      isConfirmModal: false,
      isConfirm: false,
      error: false,
      newPath: ''
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
      this.setTimeout(function() {
        if (
          self.state.newPath &&
          self.state.data.fileName &&
          self.state.isConfirm
        ) {
          callback(self.state.newPath, { title: self.state.data.fileName })
        }
      }, 200)
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
  handleConfirmation = path => {
    copyMedia({ path: path }, this.callback)
  }
  callback = data => {
    if (data.success) {
      this.setState({
        isConfirmModal: false,
        isConfirm: true,
        newPath: data.path
      })
    } else {
      this.setState({
        error: true
      })
    }
  }
  render() {
    const { isConfirmModal, data, error } = this.state
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
            {error ? <Message error header="Something went wrong!" /> : null}
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
                onClick={() => this.handleConfirmation(data.path)}
              />
            </Modal.Actions>
          </Modal>
        ) : null}
      </div>
    )
  }
}
