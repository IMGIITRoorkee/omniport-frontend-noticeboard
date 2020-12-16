import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import EditModal from './upload/NoticeModal'

import backlink from '../css/notice.css'

class BackLink extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditModal: false
        }
        this.modalRef = React.createRef()
    }

    toggleEditModal = () => {
        const { showEditModal } = this.state
        this.setState({
            showEditModal: !showEditModal
        })
    }

    render() {
        const { showEditModal } = this.state
        const { noticeId, editButton, notice, user } = this.props

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

                    {showEditModal && noticeId ? 
                        (
                            <EditModal
                                id={noticeId}
                                modalType='edit'
                                modalRef={this.modalRef}
                                handleModal={this.toggleEditModal}
                                modal={showEditModal}
                                fetchNotice={true}
                            />
                        ) : null
                    }
                    {user && notice && notice.uploader.id == user.id && editButton ? 
                        (
                            <Button
                                content='Edit'
                                styleName='backlink.back-edit-button'
                                onClick={this.toggleEditModal}
                            />
                        ) 
                        : 
                        (
                            <></>
                        )
                    }
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

const mapStateToProps = state => {
    return {
        notice: state.notices.notice,
        user: state.user.user
    }
}

export default withRouter(
    connect(mapStateToProps)(BackLink)
)
