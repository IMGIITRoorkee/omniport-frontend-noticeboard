import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon } from 'semantic-ui-react'
import UploadNoticeEditor from './upload-notice-editor'

class UploadNotice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  componentDidMount() {}
  handleModal = value => {
    this.setState({
      showModal: value
    })
  }
  render() {
    const { showModal } = this.state
    return (
      <React.Fragment>
        <Button onClick={() => this.handleModal(true)} primary>
          Upload
        </Button>

        {showModal ? (
          <Modal
            open={showModal}
            onClose={() => this.handleModal(false)}
            closeIcon
          >
            <Modal.Header>Select Categories</Modal.Header>
            <Modal.Content scrolling>
              {/* <Modal.Description>
                <Header>Modal Header</Header>
                <p>
                  This is an example of expanded content that will cause the
                  modal's dimmer to scroll
                </p>
              </Modal.Description> */}
            </Modal.Content>
            <Modal.Header>Select Categories</Modal.Header>
            <UploadNoticeEditor />
            <Modal.Actions>
              <Button primary>
                Proceed <Icon name="chevron right" />
              </Button>
            </Modal.Actions>
          </Modal>
        ) : null}
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  null
)(UploadNotice)
