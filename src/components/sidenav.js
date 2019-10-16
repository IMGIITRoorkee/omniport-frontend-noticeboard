import React, { Component } from 'react'
import { Dropdown, Menu, Divider, Icon } from 'semantic-ui-react'
import 'rc-calendar/assets/index.css'
import { connect } from 'react-redux'
import { setPosition } from '../actions/index'
import { INTIAL_PAGE } from '../constants/constants'
import { SHOW_IMP, HIDE_IMP } from '../constants/action-types'

import sidenav from '../css/sidenav.css'

class SideNav extends Component {
  goHome = (path, string) => {
    const { showImportant, hideImportant, history, setPosition } = this.props
    setPosition(string)
    string === 'important' ? showImportant() : hideImportant()
    history.push({
      pathname: path,
      state: {
        page: INTIAL_PAGE,
        searchKeyword: '',
        narrowBookmark: false,
        expired: false
      }
    })
  }

  expiredNotices = path => {
    const { history, setPosition, hideImportant } = this.props
    setPosition('expired')
    hideImportant()
    history.push({
      pathname: path,
      state: { page: INTIAL_PAGE, expired: true }
    })
  }

  narrowBookmarks(path) {
    const { history, setPosition, hideImportant } = this.props
    setPosition('bookmark')
    hideImportant()
    history.push({
      pathname: path,
      state: { page: INTIAL_PAGE, narrowBookmark: true, important: false }
    })
  }

  filterNotices = (bannerId, all, path, position = '', subPosition = '') => {
    const { searchKeyword, dateRange, history, setPosition } = this.props
    setPosition(position, subPosition)
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
    const { subPosition } = this.props
    if (items.length) {
      return items.map((item, index) => (
        <Dropdown.Item
          key={index}
          active={subPosition === item.name}
          onClick={() =>
            this.filterNotices(
              item.id,
              all,
              '/noticeboard/',
              item.parentCategory.name,
              item.name
            )
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
    const { subPosition } = this.props
    if (item.banner.length) {
      const all = true
      return (
        <Dropdown.Item
          key={0}
          active={subPosition === item.name}
          onClick={() =>
            this.filterNotices(
              item.slug,
              all,
              '/noticeboard/',
              item.name,
              item.name
            )
          }
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
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
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
    const { filters, position } = this.props
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
          styleName={
            position === 'home'
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
          onClick={() => this.goHome('/noticeboard/', 'home')}
        >
          <Icon styleName="sidenav.sidenav-icon-styling" name="home" />
          All Notices
        </Menu.Item>

        <Menu.Item
          name="Important Notices"
          styleName={
            position === 'important'
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
          onClick={() => this.goHome('/noticeboard/', 'important')}
        >
          <Icon styleName="sidenav.sidenav-icon-styling" name="tag" />
          Important Notices
        </Menu.Item>

        {this.renderOuterDropdownItems(filters)}

        <Divider styleName="sidenav.sidenav-divider" />

        <Menu.Item
          name="Bookmarks"
          styleName={
            position === 'bookmark'
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
          onClick={() => this.narrowBookmarks('/noticeboard/')}
        >
          <Icon styleName="sidenav.sidenav-icon-styling" name="bookmark" />
          Bookmarks
        </Menu.Item>

        <Divider styleName="sidenav.sidenav-divider" />

        <Menu.Item
          name="Expired"
          styleName={
            position === 'expired'
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
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
    bannerId: state.allNotices.bannerId,
    position: state.current.currentPosition,
    subPosition: state.current.subPosition
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPosition: (position, subPosition) => {
      dispatch(setPosition(position, subPosition))
    },
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
