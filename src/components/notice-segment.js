import React, { Component } from 'react'
import {
  Table,
  Container,
  Button,
  Loader,
  Pagination,
  Icon,
  Segment
} from 'semantic-ui-react'
import Notice from './notice'
import { connect } from 'react-redux'
import {
  getNotices,
  selectAll,
  noticeRead,
  noticeBookmark
} from '../actions/index'

import notice from '../css/notice.css'
class NoticeListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayselectAll: '',
      noNotices: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { notices, importantNotices, showImp } = this.props
    if (prevProps.showImp !== showImp) {
      if (showImp) this.showImportant()
    }
    let currentNotices = showImp ? importantNotices : notices
    if (prevProps.notices !== notices) {
      this.setState({
        noNotices: currentNotices.length > 0 ? false : true,
        displayselectAll: currentNotices.length > 0 ? true : false
      })
    }
  }

  handlePaginationChange = (e, { activePage }) => {
    const {
      narrowBookmark,
      bannerId,
      dateRange,
      mainCategorySlug,
      getNotices,
      searchKeyword,
      expired,
      showImp
    } = this.props
    getNotices(
      activePage,
      searchKeyword,
      narrowBookmark,
      expired,
      bannerId,
      mainCategorySlug,
      dateRange,
      showImp
    )
  }

  showImportant = e => {
    const {
      narrowBookmark,
      bannerId,
      dateRange,
      mainCategorySlug,
      getNotices,
      searchKeyword,
      expired
    } = this.props
    let activePage = 1
    getNotices(
      activePage,
      searchKeyword,
      narrowBookmark,
      expired,
      bannerId,
      mainCategorySlug,
      dateRange,
      true
    )
  }

  selectAll = e => {
    const { selectAll, selectAllActive } = this.props
    selectAll(!selectAllActive)
  }

  bookmark = e => {
    const { noticeBookmark, selectAll, selectedNotices } = this.props
    let toggle = true
    noticeBookmark(selectedNotices, toggle)
    selectAll(false)
  }

  removeBookmark = e => {
    const { noticeBookmark, selectAll, selectedNotices } = this.props
    let toggle = false
    noticeBookmark(selectedNotices, toggle)
    selectAll(false)
  }

  read = e => {
    const { noticeRead, selectAll, selectedNotices } = this.props
    let toggle = true
    noticeRead(selectedNotices, toggle)
    selectAll(false)
  }
  render() {
    const {
      totalPages,
      selectAllActive,
      isFetchingNotices,
      page,
      bannerId,
      filters,
      dateRange,
      notices,
      importantNotices,
      history,
      showImp
    } = this.props
    const { displayselectAll, noNotices } = this.state
    let currentNotices = notices
    if (showImp) {
      currentNotices = importantNotices
    }

    let bannerName, dateDisplay
    if (bannerId && filters.length > 0) {
      for (let index = 0; index < filters.length; index++) {
        for (let j = 0; j < filters[index].banner.length; j++) {
          if (bannerId === filters[index].banner[j].id) {
            bannerName = filters[index].banner[j].name
          }
        }
      }
    } else {
      bannerName = null
    }

    if (dateRange) {
      dateDisplay = dateRange.start + ' to ' + dateRange.end
    }
    return (
      <div styleName="notice.notice-list">
        {/* Select all button */}
        <Container styleName="notice.select-all-container notice.notice-container-width">
          {displayselectAll ? (
            <div>
              {selectAllActive ? (
                <div>
                  <Button
                    icon
                    styleName="notice.select-all-button-activated notice.select-all-button notice.tab-button"
                    onClick={this.selectAll}
                  >
                    <Icon name="square" color="blue"></Icon>
                  </Button>
                  <Segment styleName="notice.select-all-list notice.select-all-activated-list">
                    <Button
                      basic
                      styleName="notice.tab-button"
                      icon
                      onClick={this.read}
                    >
                      <Icon
                        name="envelope open outline"
                        color="blue"
                        styleName="notice.buttons-select-all"
                      ></Icon>
                      Mark as Read
                    </Button>
                    <Button
                      basic
                      styleName="notice.tab-button"
                      icon
                      onClick={this.bookmark}
                    >
                      <Icon
                        name="bookmark"
                        color="blue"
                        styleName="notice.buttons-select-all"
                      ></Icon>
                      Bookmark
                    </Button>
                    <Button
                      basic
                      styleName="notice.tab-button"
                      icon
                      onClick={this.removeBookmark}
                    >
                      <Icon
                        name="bookmark outline"
                        color="blue"
                        styleName="notice.buttons-select-all"
                      ></Icon>
                      Remove Bookmark
                    </Button>
                  </Segment>
                </div>
              ) : (
                <div styleName="notice.table-row">
                  <Button
                    icon
                    styleName="notice.select-all-button-not-activated  notice.select-all-button"
                    onClick={this.selectAll}
                  >
                    <Icon name="square outline"> </Icon>
                  </Button>
                  <Segment styleName="notice.select-all-list notice.display-filters">
                    <div styleName="notice.filter-block"> {bannerName} </div>
                    <div styleName="notice.filter-block"> {dateDisplay} </div>
                  </Segment>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </Container>

        {/* Notice Table */}
        {isFetchingNotices ? (
          <Container styleName="notice.notice-list-view notice.notice-list-loading notice.notice-container-width">
            <Loader active styleName="notice.loader-element" />
          </Container>
        ) : (
          <div>
            {!noNotices ? (
              <Container styleName="notice.notice-list-view notice.notice-container-width">
                <Table fixed basic singleLine compact>
                  <Table.Body>
                    {currentNotices &&
                      currentNotices.map(noticeInfo => (
                        <Notice
                          key={noticeInfo.id}
                          id={noticeInfo.id}
                          date={noticeInfo.datetimeModified}
                          banner={noticeInfo.banner}
                          title={noticeInfo.title}
                          read={noticeInfo.read}
                          bookmark={noticeInfo.starred}
                          history={history}
                        />
                      ))}
                  </Table.Body>
                </Table>
              </Container>
            ) : (
              <Container styleName="notice.notice-list-view notice.notice-container-width">
                <div styleName="notice.notice-list-no-notice">
                  <h1 styleName="no-results-found"> No results found </h1>
                </div>
              </Container>
            )}
          </div>
        )}

        <Container styleName="notice.pagination-box notice.notice-container-width">
          <Pagination
            styleName="notice.pagination"
            totalPages={totalPages}
            firstItem={null}
            onPageChange={this.handlePaginationChange}
            defaultActivePage={page}
            lastItem={null}
          />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notices: state.allNotices.notices,
    importantNotices: state.allNotices.importantNotices,
    showImp: state.allNotices.showImp,
    totalPages: state.allNotices.totalPages,
    isFetchingNotices: state.allNotices.isFetchingNotices,
    page: state.allNotices.page,
    searchKeyword: state.allNotices.searchKeyword,
    narrowBookmark: state.allNotices.narrowBookmark,
    expired: state.allNotices.expired,
    bannerId: state.allNotices.bannerId,
    mainCategorySlug: state.allNotices.mainCategorySlug,
    dateRange: state.allNotices.dateRange,
    selectAllActive: state.allNotices.selectAllActive,
    selectedNotices: state.allNotices.selectedNotices,
    filters: state.filters.filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotices: (
      page,
      searchKeyword,
      narrowBookmark,
      expired,
      bannerId,
      mainCategorySlug,
      dateRange,
      showImp
    ) => {
      dispatch(
        getNotices(
          page,
          searchKeyword,
          narrowBookmark,
          expired,
          bannerId,
          mainCategorySlug,
          dateRange,
          showImp
        )
      )
    },
    selectAll: selectAllActive => {
      dispatch(selectAll(selectAllActive))
    },
    noticeBookmark: (noticeIdList, toggle) => {
      dispatch(noticeBookmark(noticeIdList, toggle))
    },
    noticeRead: (noticeIdList, toggle) => {
      dispatch(noticeRead(noticeIdList, toggle))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeListView)
