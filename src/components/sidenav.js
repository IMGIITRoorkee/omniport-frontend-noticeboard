import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Divider, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

import sidenav from '../css/sidenav.css'
import { baseNavUrl } from '../urls'

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

    renderInnerDropdownItems = items => {
        const all = false
        const { subPosition } = this.props
        if (items.length) {
            return items.map((item, index) => (
                <Dropdown.Item
                    key={index}
                    active={subPosition === item.name}
                    // onClick={() =>
                    //     this.filterNotices(
                    //         item.id,
                    //         all,
                    //         '/noticeboard/',
                    //         item.parentCategory.name,
                    //         item.name
                    //     )
                    // }
                >
                    {item.name}
                </Dropdown.Item>
            ))
        } else {
            return (
                <Dropdown.Item key={1} disabled>
                    No results
                </Dropdown.Item>
            )
        }
    }

    renderInnerDropdownAll = item => {
        const { subPosition } = this.props
        if (item.banner.length) {
            const all = true
            return (
                <Dropdown.Item
                    key={0}
                    active={subPosition === item.name}
                    // onClick={() =>
                    //     this.filterNotices(
                    //         item.slug,
                    //         all,
                    //         '/noticeboard/',
                    //         item.name,
                    //         item.name
                    //     )
                    // }
                >
                    All {item.name}
                </Dropdown.Item>
            )
        }
    }

    renderOuterDropdownItems = items => {
        const { position } = this.props
        if (items.length > 0) {
            return items.map((item, index) => (
                <Dropdown
                    styleName={
                        position === item.name
                            ? 'sidenav.dropdown-sidenav-space-between-active'
                            : 'sidenav.dropdown-sidenav-space-between'
                    }
                    item
                    trigger={
                        <span styleName='sidenav.dropdown-item-span'>
                            {item.meta && item.meta.icon && item.meta.icon.staticPath ? (
                                <Image src={`/static${item.meta.icon.staticPath}`} />
                            ) : null}
                            {item.name}
                        </span>
                    }
                    key={index}
                    scrolling={true}
                >
                    <Dropdown.Menu>
                        {this.renderInnerDropdownAll(item)}
                        {item.banner.length ? <Dropdown.Divider /> : <div></div>}
                        {this.renderInnerDropdownItems(item.banner)}
                    </Dropdown.Menu>
                </Dropdown>
            ))
        } else return []
    }
    
    render() {
        const { position, dropPosition } = this.state
        const { filters } = this.props
        
        return (
            <Menu
                secondary
                vertical
                inverted
                attached
                styleName='sidenav.sidenav-menu'
                color={'blue'}
            >
                <Link to={baseNavUrl('/')}>
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
                <Link to={baseNavUrl('/important/')}>
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

                {filters?this.renderOuterDropdownItems(filters):null}

                <Divider styleName='sidenav.sidenav-divider' />

                <Link to={baseNavUrl('/bookmark/')}>
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

                <Link to={baseNavUrl('/expired/')}>
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