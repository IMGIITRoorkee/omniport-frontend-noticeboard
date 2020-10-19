import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Divider, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

import sidenav from '../css/sidenav.css'

class SideNav extends Component {
    state = {
        position: null,
        dropPosition: null
    }

    changePosition = (e) => {
        this.setState({
            position: e.target.id
        })
    }
    
    render() {
        const { position, dropPosition } = this.state
        const { match } = this.props
        return (
            <Menu
                secondary
                vertical
                inverted
                attached
                styleName='sidenav.sidenav-menu'
                color={'blue'}
            >
                <Link to={`${match.path}`}>
                    <Menu.Item
                        name='All Notices'
                        id='home'
                        styleName={
                            position === 'home'
                                ? 'sidenav.sidenav-active-item'
                                : 'sidenav.sidenav-items'
                        }
                        onClick={this.changePosition}
                    >
                        <Icon styleName='sidenav.sidenav-icon-styling' name='home' />
                        All Notices
                    </Menu.Item>
                </Link>
                <Link to={`${match.path}important`}>
                    <Menu.Item
                        name='Important'
                        id='important'
                        styleName={
                            position === 'important'
                                ? 'sidenav.sidenav-active-item'
                                : 'sidenav.sidenav-items'
                        }
                        onClick={this.changePosition}
                    >
                        <Icon styleName='sidenav.sidenav-icon-styling' name='tag' />
                        Important Notices
                    </Menu.Item>
                </Link>
                {/* {this.renderOuterDropdownItems(filters)} */}

                <Divider styleName='sidenav.sidenav-divider' />

                <Link to={`${match.path}bookmark`}>
                    <Menu.Item
                        name='Bookmark'
                        id='bookmark'
                        styleName={
                            position === 'bookmark'
                                ? 'sidenav.sidenav-active-item'
                                : 'sidenav.sidenav-items'
                        }
                        onClick={this.changePosition}
                    >
                        <Icon styleName='sidenav.sidenav-icon-styling' name='bookmark' />
                        Bookmarks
                    </Menu.Item>
                </Link>

                <Divider styleName='sidenav.sidenav-divider' />

                <Link to={`${match.path}expired`}>
                    <Menu.Item
                        name='Expired'
                        id='expired'
                        styleName={
                            position === 'expired'
                                ? 'sidenav.sidenav-active-item'
                                : 'sidenav.sidenav-items'
                        }
                        onClick={this.changePosition}
                    >
                        <Icon styleName='sidenav.sidenav-icon-styling' name='time' />
                        Expired
                    </Menu.Item>
                </Link>

                <Divider styleName='sidenav.sidenav-divider' />

                <Menu.Item name='Link to old notices' styleName='sidenav.sidenav-items'>
                    <a
                        href='https://channeli.in/#notices'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <Icon
                            styleName='sidenav.sidenav-icon-styling'
                            name='arrow alternate circle right'
                        />
                        Link to old notices
                    </a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default connect(null, null)(SideNav)