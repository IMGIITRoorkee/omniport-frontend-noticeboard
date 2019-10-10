import React, { Component } from 'react'
import { Dropdown, Menu, Divider, Icon } from 'semantic-ui-react'
import 'rc-calendar/assets/index.css'
import { connect } from 'react-redux'
import { INTIAL_PAGE } from '../constants/constants'
import { SHOW_IMP, HIDE_IMP } from '../constants/action-types'

import sidenav from '../css/sidenav.css'

class SideNav extends Component {
  goHome = (path, important = false) => {
    const { showImportant, hideImportant, history } = this.props
    important ? showImportant() : hideImportant()
    history.push({
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
          <Icon styleName="sidenav.sidenav-icon-styling" name="home" />
          All Notices
        </Menu.Item>

        <Menu.Item
          name="Important Notices"
          onClick={() => this.goHome('/noticeboard/', true)}
        >
          <Icon styleName="sidenav.sidenav-icon-styling" name="tag" />
          Important Notices
        </Menu.Item>

        {this.renderOuterDropdownItems(filters)}

        <Divider styleName="sidenav.sidenav-divider" />

        <Menu.Item
          name="Bookmarks"
          onClick={() => this.narrowBookmarks('/noticeboard/')}
        >
          <Icon styleName="sidenav.sidenav-icon-styling" name="bookmark" />
          Bookmarks
        </Menu.Item>

        <Divider styleName="sidenav.sidenav-divider" />

        <Menu.Item
          name="Expired"
          onClick={() => this.expiredNotices('/noticeboard/')}
        >
          <Icon styleName="sidenav.sidenav-icon-styling" name="time" />
          Expired
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

const mapDispatchToProps = dispatch => {
  return {
    showImportant: () => {
      dispatch({
        type: SHOW_IMP,
        payload: {}
      })
    },
    hideImportant: () => {
      dispatch({
        type: HIDE_IMP,
        payload: {}
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav)
