import React, { Component } from 'react'
import { Modal, Button, Message } from 'semantic-ui-react'
import { Editor } from '@tinymce/tinymce-react'
import { urlFileManager } from '../urls'
import { copyMedia } from '../actions/index'
import config from '../../config.json'

import editor from '../css/upload-notice-editor.css'

export default class UploadNoticeEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
      isConfirmModal: false,
      isConfirm: false,
      error: false,
      newPath: '',
      isConfirmLoading: false
    }
  }

  messageReceiver = e => {
    if (e && e.data && e.data.file && e.data.fileName) {
      this.setState({
        data: e.data,
        isConfirmModal: true
      })
    }
  }

  getHeight = (url, parentThis) => {
    var img = new Image()
    img.onload = function () {
      parentThis.setState({
        imgHeight: this.height,
        imgWidth: this.width
      })
    }
    img.src = url
  }

  componentDidMount () {
    window.addEventListener('message', this.messageReceiver, false)
  }
  handleClick = (callback, value, meta) => {
    let self = this
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=1000px,height=500px,left=100px,top=100px`
    window.open(urlFileManager(), 'title', params)

    window.addEventListener('mousemove', function clickEventListener (e) {
      this.setTimeout(function () {
        if (
          self.state.newPath &&
          self.state.data.fileName &&
          self.state.isConfirm
        ) {
          callback(self.state.newPath, {
            title: self.state.data.fileName,
            width: '768',
            height: `${parseInt(
              (self.state.imgHeight * 768) / self.state.imgWidth
            )}`
          })
          window.removeEventListener('mousemove', clickEventListener)
        }
      }, 100)
    })
  }
  componentWillUnmount () {
    window.removeEventListener('message', this.messageReceiver, false)
  }
  closeConfirmationModal = () => {
    this.setState({
      isConfirmModal: false,
      data: ''
    })
  }
  handleConfirmation = path => {
    this.setState({
      isConfirmLoading: true
    })
    copyMedia({ path: path }, this.callback)
  }
  callback = data => {
    if (data.success) {
      this.setState(
        {
          isConfirmModal: false,
          isConfirm: true,
          newPath: data.path,
          isConfirmLoading: false
        },
        () => {
          this.getHeight(data.path, this)
        }
      )
    } else {
      this.setState({
        error: true,
        isConfirmLoading: false
      })
    }
  }
  render () {
    const { isConfirmModal, data, error, isConfirmLoading } = this.state
    const { mountedNode, handleEditorChange, content } = this.props
    return (
      <div styleName='editor.editor-parent'>
        <Editor
          apiKey={config.apiKey}
          init={{
            height: '300',
            image_title: true,
            relative_urls: false,
            remove_script_host: false,
            automatic_uploads: true,
            content_style: 'img { max-width: 100%; height:auto}',
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media imagetools table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | image | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent |removeformat | help',
            file_picker_callback: (callback, value, meta) => {
              this.handleClick(callback, value, meta)
            },
            file_browser_callback_types: 'file image media link',
            branding: false
          }}
          onChange={handleEditorChange}
          menubar={false}
          initialValue={content}
        />
        {isConfirmModal ? (
          <Modal
            size='large'
            open={isConfirmModal}
            onClose={this.closeConfirmationModal}
            mountNode={mountedNode ? mountedNode.current : null}
          >
            {error ? <Message error header='Something went wrong!' /> : null}
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
                icon='checkmark'
                labelPosition='right'
                loading={isConfirmLoading}
                content='Yes'
                onClick={() => this.handleConfirmation(data.path)}
              />
            </Modal.Actions>
          </Modal>
        ) : null}
      </div>
    )
  }
}
