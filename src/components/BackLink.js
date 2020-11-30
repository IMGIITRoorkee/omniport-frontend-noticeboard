import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import backlink from '../css/notice.css'

class BackLink extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditModal: false
        }
        this.modalRef = React.createRef()
    }

    render() {
        const { showEditModal } = this.state
        // const { match, editButton, notice, user } = this.props

        return (
            <Menu.Menu>
                <Menu.Item styleName='backlink.back-button backlink.back-wrapper'>
                    <Button
                        styleName='backlink.menu-button-border backlink.tab-button'
                        onClick={this.props.history.goBack}
                        icon='arrow left'
                        content='Back'
                    />
                    <div
                        styleName='backlink.modal-mount-parent'
                        ref={this.modalRef}
                    ></div>

                    {/* {showEditModal ? (
                        <EditModal
                            id={match.params && match.params.noticeId}
                            modalType='edit'
                            modalRef={this.modalRef}
                            handleModal={this.toggleEditModal}
                            modal={showEditModal}
                            fetchNotice={true}
                        />
                    ) : null} */}
                    {/* {notice && notice.uploader.id == user.id && editButton ? ( */}
                        <Button
                            content='Edit'
                            styleName='backlink.back-edit-button'
                            // onClick={this.toggleEditModal}
                        />
                    {/* ) : (
                            <></>
                        )} */}
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BackLink)
)
