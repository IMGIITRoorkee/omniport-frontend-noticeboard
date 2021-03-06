import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Divider, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setPosition } from '../actions/index'
import { INTIAL_PAGE } from '../constants/constants'
import { SHOW_IMP, HIDE_IMP } from '../constants/action-types'

import sidenav from '../css/sidenav.css'
import 'rc-calendar/assets/index.css'

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
        expired: false,
        showImp: string === 'important'
      }
    })
  }

  expiredNotices = path => {
    const { history, setPosition, hideImportant } = this.props
    setPosition('expired')
    hideImportant()
    history.push({
      pathname: path,
      state: { page: INTIAL_PAGE, expired: true, showImp: false }
    })
  }

  narrowBookmarks (path) {
    const { history, setPosition, hideImportant } = this.props
    setPosition('bookmark')
    hideImportant()
    history.push({
      pathname: path,
      state: { page: INTIAL_PAGE, narrowBookmark: true, showImp: false }
    })
  }

  filterNotices = (bannerId, all, path, position = '', subPosition = '') => {
    const {
      searchKeyword,
      dateRange,
      history,
      setPosition,
      hideImportant
    } = this.props
    setPosition(position, subPosition)
    hideImportant()
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

  render () {
    const { filters, position } = this.props
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
          styleName={
            position === 'home'
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
          onClick={() => this.goHome('/noticeboard/', 'home')}
        >
          <Icon styleName='sidenav.sidenav-icon-styling' name='home' />
          All Notices
        </Menu.Item>

        <Menu.Item
          name='Important Notices'
          styleName={
            position === 'important'
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
          onClick={() => this.goHome('/noticeboard/', 'important')}
        >
          <Icon styleName='sidenav.sidenav-icon-styling' name='tag' />
          Important Notices
        </Menu.Item>

        {this.renderOuterDropdownItems(filters)}

        <Divider styleName='sidenav.sidenav-divider' />

        <Menu.Item
          name='Bookmarks'
          styleName={
            position === 'bookmark'
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
          onClick={() => this.narrowBookmarks('/noticeboard/')}
        >
          <Icon styleName='sidenav.sidenav-icon-styling' name='bookmark' />
          Bookmarks
        </Menu.Item>

        <Divider styleName='sidenav.sidenav-divider' />

        <Menu.Item
          name='Expired'
          styleName={
            position === 'expired'
              ? 'sidenav.sidenav-active-item'
              : 'sidenav.sidenav-items'
          }
          onClick={() => this.expiredNotices('/noticeboard/')}
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
    dateRange: state.allNotices.dateRange,
    searchKeyword: state.allNotices.searchKeyword,
    bannerId: state.allNotices.bannerId,
    position: state.current.currentPosition,
    subPosition: state.current.subPosition,
    sidenavOpen: state.allNotices.sidenavOpen
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

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
