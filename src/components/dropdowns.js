import React, { Component } from 'react'
import {
  Dropdown,
  Form,
  Menu,
  Input,
  Icon,
  Button,
  Label
} from 'semantic-ui-react'
import 'rc-calendar/assets/index.css'
import { connect } from 'react-redux'
import { INTIAL_PAGE } from '../constants/constants'
import { DatesRangeInput } from 'semantic-ui-calendar-react'
import { dateFormatMatch } from '../utils'
import UploadNotice from './upload-notice'
import Backlink from './all-notices-button'
import { SHOW_IMP, HIDE_IMP } from '../constants/action-types'
import { setPosition } from '../actions'

import dropdown from '../css/notice.css'

const buildNoticeboardUrl = ({
  page = INTIAL_PAGE,
  searchKeyword,
  bannerId,
  mainCategorySlug,
  dateRange,
  expired,
  showImp,
  bookmark
} = {}) => {
  const params = new URLSearchParams()

  if (page) {
    params.set('page', page)
  }

  if (searchKeyword) {
    params.set('search', searchKeyword)
  }

  if (bannerId) {
    params.set('bannerId', bannerId)
  }

  if (mainCategorySlug) {
    params.set('mainCategorySlug', mainCategorySlug)
  }

  if (dateRange && dateRange.start && dateRange.end) {
    params.set('dateRange', `${dateRange.start},${dateRange.end}`)
  }

  if (expired) {
    params.set('expired', 'true')
  }

  if (showImp) {
    params.set('showImp', 'true')
  }

  if (bookmark) {
    params.set('bookmark', 'true')
  }

  const queryString = params.toString()
  return queryString ? `/noticeboard/?${queryString}` : '/noticeboard/'
}

class DropdownView extends Component {
  constructor(props) {
    super(props)

    let searchDone, value, dateFilterActive, dateRangeTemp
    const { searchKeyword, dateRange } = this.props
    if (searchKeyword) {
      searchDone = true
      value = searchKeyword
    } else {
      searchDone = false
      value = ''
    }

    if (dateRange) {
      dateRangeTemp = dateRange.start + ' - ' + dateRange.end
      dateFilterActive = true
    } else {
      dateRangeTemp = ''
      dateFilterActive = false
    }

    this.state = {
      datesRange: dateRangeTemp,
      value: value,
      searchDone: searchDone,
      dateFilterActive: dateFilterActive
    }
  }

  componentDidUpdate(prevProps) {
    const { notices, importantUnreadCount, searchKeyword, dateRange } = this.props

    // Update unread count when notices change
    if (prevProps.notices !== notices) {
      this.setState({
        importantUnreadCount: importantUnreadCount
      })
    }

    // Keep search input in sync with Redux (e.g. on refresh or deep link)
    if (prevProps.searchKeyword !== searchKeyword) {
      this.setState({
        value: searchKeyword || '',
        searchDone: !!searchKeyword
      })
    }

    // Keep date range input in sync with Redux
    if (prevProps.dateRange !== dateRange) {
      let dateRangeTemp = ''
      let dateFilterActive = false

      if (dateRange) {
        dateRangeTemp = dateRange.start + ' - ' + dateRange.end
        dateFilterActive = true
      }

      this.setState({
        datesRange: dateRangeTemp,
        dateFilterActive: dateFilterActive
      })
    }
  }

  handleDateFilterChange = (event, { name, value }) => {
    const { searchKeyword, bannerId, mainCategorySlug, history, expired } = this.props
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })

      let dateRange, dateRangeActive
      dateRange = dateFormatMatch(value)

      let flag = false
      if (dateRange || value === '') {
        flag = true
      }

      if (value === '') {
        dateRangeActive = false
      } else {
        dateRangeActive = true
      }

      if (flag) {
        this.setState({
          dateFilterActive: dateRangeActive,
          datesRange: value
        })
        const url = buildNoticeboardUrl({
          page: INTIAL_PAGE,
          searchKeyword,
          bannerId,
          mainCategorySlug,
          dateRange,
          expired
        })
        history.push(url)
      }
    }
  }

  handleDateFilterSubmit = () => {
    const { searchKeyword, bannerId, mainCategorySlug, history, expired } = this.props
    const { datesRange } = this.state

    let dateRange, dateRangeActive
    dateRange = dateFormatMatch(datesRange)
    if (dateRange) {
      dateRangeActive = true
    } else {
      dateRangeActive = false
    }

    this.setState({
      dateFilterActive: dateRangeActive,
      datesRange: datesRange
    })

    const url = buildNoticeboardUrl({
      page: INTIAL_PAGE,
      searchKeyword,
      bannerId,
      mainCategorySlug,
      dateRange,
      expired
    })
    history.push(url)
  }

  handleDateDelete = () => {
    const { searchKeyword, bannerId, mainCategorySlug, history, expired } = this.props
    this.setState({ dateFilterActive: false, datesRange: '' })
    const url = buildNoticeboardUrl({
      page: INTIAL_PAGE,
      searchKeyword,
      bannerId,
      mainCategorySlug,
      expired
    })
    history.push(url)
  }

  expiredNotices = path => {
    const { history } = this.props
    const url = buildNoticeboardUrl({
      page: INTIAL_PAGE,
      expired: true
    })
    history.push(url)
  }

  filterNotices = (bannerId, path) => {
    const { searchKeyword, history, expired } = this.props
    const url = buildNoticeboardUrl({
      page: INTIAL_PAGE,
      searchKeyword,
      bannerId,
      expired
    })
    history.push(url)
  }

  renderInnerDropdownItems = items => {
    if (items.length > 0) {
      return items.map((item, index) => (
        <Dropdown.Item
          key={index}
          onClick={() => this.filterNotices(item.id, '/noticeboard/')}
        >
          {item.name}
        </Dropdown.Item>
      ))
    } else return []
  }

  renderOuterDropdownItems = items => {
    if (items.length > 0) {
      return items.map((item, index) => (
        <Dropdown.Item key={index}>
          <Dropdown text={item.name} pointing='left'>
            <Dropdown.Menu styleName='dropdown.dropdown-left'>
              {this.renderInnerDropdownItems(item.banner)}
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
      ))
    } else return []
  }

  handleSearchChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSearchDelete = event => {
    const {
      bannerId,
      mainCategorySlug,
      history,
      dateRange,
      expired
    } = this.props

    this.setState({ searchDone: false, value: '' })
    
    const url = buildNoticeboardUrl({
      page: INTIAL_PAGE,
      bannerId,
      mainCategorySlug,
      dateRange,
      expired
    })

    history.push(url)
  }

  handleSearchSubmit = () => {
    const {
      bannerId,
      mainCategorySlug,
      history,
      dateRange,
      expired
    } = this.props

    const { value } = this.state

    let searchDone
    if (value) {
      searchDone = true
    } else {
      searchDone = false
    }

    this.setState({ searchDone: searchDone })
    
    const url = buildNoticeboardUrl({
      page: INTIAL_PAGE,
      searchKeyword: value,
      bannerId,
      mainCategorySlug,
      dateRange,
      expired
    })

    history.push(url)
  }
  handleImportant = () => {
    const { history, setPosition, showImportant } = this.props
    setPosition('important')
    showImportant()
    const url = buildNoticeboardUrl({
      page: INTIAL_PAGE,
      showImp: true
    })
    history.push(url)
  }

  render() {
    const {
      dateFilterActive,
      datesRange,
      searchDone,
      value,
      importantUnreadCount,
      expired
    } = this.state
    const { showImp, permission } = this.props

    return (
      <div>
        {!showImp && !expired ? (
          <div styleName='dropdown.important-main-box dropdown.flex dropdown.flex-row'>
            <div styleName='dropdown.important-sub-left dropdown.flex dropdown.flex-column'>
              <h4>
                Important notices
                {importantUnreadCount > 0 ? (
                  <Label
                    styleName='dropdown.unread-label'
                    size='small'
                    color='red'
                    horizontal
                  >
                    {importantUnreadCount} unread
                  </Label>
                ) : null}
              </h4>
            </div>
            <div styleName='dropdown.important-sub-right'>
              <Button
                basic
                color='blue'
                content='Show All'
                styleName='dropdown.important-button'
                onClick={this.handleImportant}
              />
            </div>
          </div>
        ) : (
          <Backlink important={false} />
        )}
        {!showImp ? (
          <Menu.Menu position='left' styleName='dropdown.flex-wrap'>
            <Menu.Item styleName='dropdown.date-bar'>
              {!dateFilterActive ? (
                <Form onSubmit={this.handleDateFilterSubmit} autoComplete='off'>
                  <DatesRangeInput
                    styleName='dropdown.input-bar'
                    name='datesRange'
                    placeholder='Date: From - To'
                    closable={true}
                    closeOnMouseLeave={true}
                    value={datesRange}
                    dateFormat='YYYY-MM-DD'
                    onChange={this.handleDateFilterChange}
                  />
                </Form>
              ) : (
                <Form onSubmit={this.handleDateFilterSubmit} autoComplete='off'>
                  <DatesRangeInput
                    styleName='dropdown.input-bar'
                    name='datesRange'
                    placeholder='Date: From - To'
                    closable={true}
                    icon={
                      <Icon
                        name='delete'
                        link
                        onClick={this.handleDateDelete}
                      />
                    }
                    closeOnMouseLeave={true}
                    value={datesRange}
                    dateFormat='YYYY-MM-DD'
                    onChange={this.handleDateFilterChange}
                  />
                </Form>
              )}
            </Menu.Item>
            <Menu.Item styleName='dropdown.search-menu-item'>
              {!searchDone ? (
                <Form onSubmit={this.handleSearchSubmit}>
                  <Input
                    styleName='dropdown.input-bar dropdown.search-bar'
                    onChange={this.handleSearchChange}
                    type='text'
                    icon={
                      <Icon
                        name='search'
                        link
                        onClick={this.handleSearchSubmit}
                      />
                    }
                    value={value}
                  />
                </Form>
              ) : (
                <Form onSubmit={this.handleSearchSubmit}>
                  <Input
                    styleName='dropdown.input-bar dropdown.search-bar'
                    type='text'
                    onChange={this.handleSearchChange}
                    icon={
                      <Icon
                        name='delete'
                        link
                        onClick={this.handleSearchDelete}
                      />
                    }
                    value={value}
                  />
                </Form>
              )}
            </Menu.Item>
            {permission.length > 0 ? (
              <Menu.Item
                position='right'
                styleName='dropdown.upload-item-padding'
              >
                <UploadNotice />
              </Menu.Item>
            ) : null}
          </Menu.Menu>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notices: state.allNotices.notices,
    filters: state.filters.filters,
    dateRange: state.allNotices.dateRange,
    searchKeyword: state.allNotices.searchKeyword,
    mainCategorySlug: state.allNotices.mainCategorySlug,
    bannerId: state.allNotices.bannerId,
    showImp: state.allNotices.showImp,
     expired: state.allNotices.expired,
    permission: state.permission.permission,
    importantUnreadCount: state.allNotices.importantUnreadCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPosition: position => {
      dispatch(setPosition(position))
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

export default connect(mapStateToProps, mapDispatchToProps)(DropdownView)
