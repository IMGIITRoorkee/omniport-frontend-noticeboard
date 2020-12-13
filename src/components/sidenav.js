import React, { Component } from 'react'
import { Dropdown, Menu, Divider, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { bannerUrl } from '../urls'

import sidenav from '../css/sidenav.css'

class SideNav extends Component {

    filterNotices = (bannerId, searchKeyword = null, dateFilter = null) => {
        const { history } = this.props
        history.push(bannerUrl(bannerId, searchKeyword, dateFilter))
    }

    linkUrl = (link, searchKeyword = null, dateFilter = null) => {
        history.push(bannerUrl(link, searchKeyword, dateFilter))
    }

    renderInnerDropdownItems = items => {
        const { position, searchKeyword, dateFilter } = this.props
        if (items.length) {
            return items.map((item, index) => (
                <Dropdown.Item
                    key={index}
                    active={position == item.id}
                    onClick={() =>
                        this.filterNotices(item.id, searchKeyword, dateFilter)
                    }
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
        const { position, searchKeyword, dateFilter } = this.props
        if (item.banner.length) {
            return (
                <Dropdown.Item
                    key={0}
                    active={position === item.slug}
                    onClick={() =>
                        this.filterNotices(item.slug, searchKeyword, dateFilter)
                    }
                >
                    All {item.name}
                </Dropdown.Item>
            )
        }
    }

    renderOuterDropdownItems = (items, outerPosition) => {
        if (items.length > 0) {
            return items.map((item, index) => (
                <Dropdown
                    styleName={
                        outerPosition === item.slug
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
        const { filters, searchKeyword, dateFilter, position } = this.props
        const { filterNotices } = this
        let outerPosition
        if(filters){
            for(let i = 0; i<filters.length; i++) {
                if(position == filters[i].slug){
                    outerPosition = filters[i].slug
                    break
                }
                for(let j=0; j<filters[i].banner.length; j++){
                    if(position == filters[i].banner[j].id){
                        outerPosition = filters[i].slug
                        break
                    }
                }
                if(outerPosition){
                    break
                }
            }
        }

        return (
            <Menu
                secondary
                vertical
                inverted
                attached
                styleName='sidenav.sidenav-menu'
                color={'blue'}
            >
                <Menu.Item
                    name='All Notices'
                    id='home'
                    styleName={
                        position === 'home'
                            ? 'sidenav.sidenav-active-item'
                            : 'sidenav.sidenav-items'
                    }
                    onClick={() => filterNotices(null, searchKeyword, dateFilter)}
                >
                    <Icon styleName='sidenav.sidenav-icon-styling' name='home' />
                    All Notices
                </Menu.Item>
                <Menu.Item
                    name='Important'
                    id='important'
                    styleName={
                        position === 'important'
                            ? 'sidenav.sidenav-active-item'
                            : 'sidenav.sidenav-items'
                    }
                    onClick={() => filterNotices('important')}
                >
                    <Icon styleName='sidenav.sidenav-icon-styling' name='tag' />
                    Important Notices
                </Menu.Item>

                {filters?this.renderOuterDropdownItems(filters, outerPosition):null}

                <Divider styleName='sidenav.sidenav-divider' />

                <Menu.Item
                    name='Bookmark'
                    id='bookmark'
                    styleName={
                        position === 'bookmark'
                            ? 'sidenav.sidenav-active-item'
                            : 'sidenav.sidenav-items'
                    }
                    onClick={() => filterNotices('bookmark')}
                >
                    <Icon styleName='sidenav.sidenav-icon-styling' name='bookmark' />
                    Bookmarks
                </Menu.Item>

                <Divider styleName='sidenav.sidenav-divider' />

                <Menu.Item
                    name='Expired'
                    id='expired'
                    styleName={
                        position === 'expired'
                            ? 'sidenav.sidenav-active-item'
                            : 'sidenav.sidenav-items'
                    }
                    onClick={() => filterNotices('expired')}
                >
                    <Icon styleName='sidenav.sidenav-icon-styling' name='time' />
                    Expired
                </Menu.Item>

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

const mapStateToProps = state => {
    return {
        filters: state.filters.filters,
        searchKeyword: state.notices.searchKeyword,
        dateFilter: state.notices.dateRange,
        position: state.position.position
    }
}

export default connect(mapStateToProps, null)(SideNav)