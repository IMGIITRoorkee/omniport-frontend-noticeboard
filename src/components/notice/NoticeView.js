import React, { Component } from 'react'

import { Container, Menu, Button, Icon, Segment, Table, Pagination } from 'semantic-ui-react'

import { Route, withRouter, useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import NoticeCell from './NoticeCell'
import { baseNavUrl } from '../../urls'

import notice from '../../css/notice.css'
import noticesReducer from '../../reducers/noticesReducer'


class NoticeView extends Component {

    render() {
        return (
            null
        )
    }
}

export default withRouter(connect(null, null)(NoticeView))
