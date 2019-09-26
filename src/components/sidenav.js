import React, { Component } from 'react'
import { Dropdown, Menu, Divider, Icon } from 'semantic-ui-react'
import 'rc-calendar/assets/index.css'
import { connect } from 'react-redux'
import { INTIAL_PAGE } from '../constants/constants'

import sidenav from '../css/notice.css'

class SideNav extends Component {
  goHome = path => {
    this.props.history.push({
      pathname: path,
      state: { page: INTIAL_PAGE, searchKeyword: '', narrowBookmark: false }
    })
  }

  expiredNotices = path => {
    this.props.history.push({
      pathname: path,
      state: { page: INTIAL_PAGE, expired: true }
    })
  }

  narrowBookmarks(path) {
    this.props.history.push({
      pathname: path,
      state: { page: INTIAL_PAGE, narrowBookmark: true }
    })
  }

  filterNotices = (bannerId, all, path) => {
    const { searchKeyword, dateRange, history } = this.props
    history.push({
      pathname: path,
      state: {
        page: INTIAL_PAGE,
        searchKeyword: searchKeyword,
        dateRange: dateRange,
        mainCategorySlug: all,
        bannerId: bannerId
      }
    })
  }

  renderInnerDropdownItems = items => {
    const all = false
    if (items.length) {
      return items.map((item, index) => (
        <Dropdown.Item
          key={index}
          onClick={() => this.filterNotices(item.id, all, '/noticeboard/')}
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
    if (item.banner.length) {
      const all = true
      return (
        <Dropdown.Item
          key={0}
          onClick={() => this.filterNotices(item.slug, all, '/noticeboard/')}
        >
          All {item.name}
        </Dropdown.Item>
      )
    }
  }

  renderOuterDropdownItems = items => {
    if (items.length > 0) {
      return items.map((item, index) => (
        <Dropdown
          styleName="sidenav.sidenav-items"
          item
          text={item.name}
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
    const { filters } = this.props
    return (
      <Menu
        secondary
        vertical
        inverted
        attached
        styleName="sidenav.sidenav-menu"
        color={'blue'}
      >
        <Menu.Item
          name="All Notices"
          onClick={() => this.goHome('/noticeboard/')}
        >
          All Notices
        </Menu.Item>

        {this.renderOuterDropdownItems(filters)}

        <Divider styleName="sidenav.sidenav-divider" />

        <Menu.Item
          name="Expired"
          onClick={() => this.expiredNotices('/noticeboard/')}
        >
          Expired
        </Menu.Item>

        <Divider styleName="sidenav.sidenav-divider" />

        <Menu.Item
          name="Bookmarks"
          onClick={() => this.narrowBookmarks('/noticeboard/')}
        >
          Bookmarks
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters.filters,
    dateRange: state.allNotices.dateRange,
    searchKeyword: state.allNotices.searchKeyword,
    bannerId: state.allNotices.bannerId
  }
}

export default connect(mapStateToProps)(SideNav)
