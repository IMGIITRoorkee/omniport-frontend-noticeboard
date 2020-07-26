import React, { Component } from 'react'
import {
  Table,
  Container,
  Button,
  Loader,
  Pagination,
  Icon,
  Segment,
  Modal
} from 'semantic-ui-react'
import Notice from './notice'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  getNotices,
  selectAll,
  noticeRead,
  noticeBookmark
} from '../actions/index'
import { ifRole } from 'formula_one'
import { deleteNotice } from '../actions/delete-notice'
import EditModal from './notice-modal'
import { iconName, headingName } from '../utils'

import notice from '../css/notice.css'

class NoticeListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayselectAll: '',
      noNotices: '',
      editId: -1,
      showEditModal: false,
      open: false,
      deleteId: -1,
      activePage: 1
    }
    this.modalRef = React.createRef()
  }

  componentDidUpdate (prevProps) {
    const { notices } = this.props
    if (prevProps.notices !== notices) {
      this.setState({
        noNotices: notices.length === 0,
        displayselectAll: notices.length > 0
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
    this.setState({
      activePage: activePage
    })
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

  handleEditNotice = id => {
    this.setState({
      showEditModal: true,
      editId: id
    })
  }

  handleEditModal = value => {
    this.setState({
      showEditModal: value
    })
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

  handleCancel = () => {
    this.setState({ open: false, deleteId: -1 })
  }

  handleConfirm = () => {
    let { deleteId, deleteNoticeType } = this.state
    this.props.deleteNotice(deleteId, deleteNoticeType)
    this.handleCancel()
  }

  deleteNotice = (id, type = 'new') => {
    this.setState({
      deleteId: id,
      open: true,
      deleteNoticeType: type
    })
  }

  render () {
    const {
      totalPages,
      selectAllActive,
      isFetchingNotices,
      page,
      bannerId,
      filters,
      dateRange,
      notices,
      history,
      expired,
      position,
      user
    } = this.props
    const {
      displayselectAll,
      noNotices,
      showEditModal,
      editId,
      open
    } = this.state
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
      dateDisplay =
        moment(dateRange.start).format('MMM Do') +
        ' to ' +
        moment(dateRange.end).format('MMM Do')
    }
    return (
      <div styleName='notice.notice-list'>
        <Container styleName='notice.notice-container-width'>
          <div styleName='notice.notice-type-heading'>
            <Icon name={iconName(position)} color='blue' />
            <span>{headingName(position)}</span>
          </div>
        </Container>
        {(user && ifRole(user.roles, 'Guest') === 'IS_ACTIVE') ||
        expired ? null : (
          <React.Fragment>
            {displayselectAll ? (
              <Container styleName='notice.select-all-container notice.notice-container-width'>
                {selectAllActive ? (
                  <div>
                    <Button
                      icon
                      styleName='notice.select-all-button-activated notice.select-all-button notice.tab-button'
                      onClick={this.selectAll}
                    >
                      <Icon name='square' color='blue'></Icon>
                    </Button>
                    <Segment styleName='notice.select-all-list notice.select-all-activated-list'>
                      <Button
                        basic
                        styleName='notice.tab-button'
                        icon
                        onClick={this.read}
                      >
                        <Icon
                          name='envelope open outline'
                          color='blue'
                          styleName='notice.buttons-select-all'
                        ></Icon>
                        Mark as Read
                      </Button>
                      <Button
                        basic
                        styleName='notice.tab-button'
                        icon
                        onClick={this.bookmark}
                      >
                        <Icon
                          name='bookmark'
                          color='blue'
                          styleName='notice.buttons-select-all'
                        ></Icon>
                        Bookmark
                      </Button>
                      <Button
                        basic
                        styleName='notice.tab-button'
                        icon
                        onClick={this.removeBookmark}
                      >
                        <Icon
                          name='bookmark outline'
                          color='blue'
                          styleName='notice.buttons-select-all'
                        ></Icon>
                        Remove Bookmark
                      </Button>
                    </Segment>
                  </div>
                ) : (
                  <div styleName='notice.table-row'>
                    <Button
                      icon
                      styleName='notice.select-all-button-not-activated  notice.select-all-button'
                      onClick={this.selectAll}
                    >
                      <Icon name='square outline'> </Icon>
                    </Button>
                    <Segment styleName='notice.select-all-list notice.display-filters'>
                      <div styleName='notice.filter-block'>
                        {bannerName || dateDisplay ? 'Filters:' : null}
                        {bannerName ? ` ${bannerName}` : null}
                        {bannerName && dateDisplay ? '; ' : null}
                        {dateDisplay ? ` ${dateDisplay}` : null}
                      </div>
                    </Segment>
                  </div>
                )}
              </Container>
            ) : (
              <></>
            )}
          </React.Fragment>
        )}

        {/* Notice Table */}
        {isFetchingNotices ? (
          <Container styleName='notice.notice-list-view notice.notice-list-loading notice.notice-container-width'>
            <Loader active styleName='notice.loader-element' />
          </Container>
        ) : (
          <div>
            {!noNotices ? (
              <Container styleName='notice.notice-list-view notice.notice-container-width'>
                <Table basic celled singleLine compact unstackable selectable>
                  <Table.Body>
                    {notices &&
                      notices.map(noticeInfo => (
                        <Notice
                          key={noticeInfo.id}
                          id={noticeInfo.id}
                          date={noticeInfo.datetimeModified}
                          banner={noticeInfo.banner}
                          title={noticeInfo.title}
                          read={noticeInfo.read}
                          important={noticeInfo.isImportant}
                          bookmark={noticeInfo.starred}
                          history={history}
                          uploader={noticeInfo.uploader}
                          editNotice={this.handleEditNotice}
                          deleteNotice={this.deleteNotice}
                        />
                      ))}
                  </Table.Body>
                </Table>
              </Container>
            ) : (
              <Container styleName='notice.notice-list-view notice.notice-container-width'>
                <div styleName='notice.notice-list-no-notice'>
                  <h1 styleName='no-results-found'> No results found </h1>
                </div>
              </Container>
            )}
          </div>
        )}

        <div styleName='notice.modal-mount-parent' ref={this.modalRef}></div>

        {showEditModal ? (
          <EditModal
            id={editId}
            modalType='edit'
            modalRef={this.modalRef}
            handleModal={this.handleEditModal}
            modal={showEditModal}
          />
        ) : null}

        <Modal size='tiny' open={open} onClose={this.close}>
          <Modal.Header>Delete this Notice</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this notice?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              icon='left arrow'
              content='Keep'
              positive
              onClick={this.handleCancel}
            />
            <Button
              basic
              icon='trash alternate'
              content="Delete, I'm sure"
              negative
              content='Yes'
              onClick={this.handleConfirm}
            />
          </Modal.Actions>
        </Modal>

        {!noNotices ? (
          <Container styleName='notice.pagination-box notice.notice-container-width'>
            <Pagination
              styleName='notice.pagination'
              totalPages={totalPages}
              firstItem={null}
              activePage={this.state.activePage}
              onPageChange={this.handlePaginationChange}
              defaultActivePage={1}
              lastItem={null}
            />
          </Container>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notices: state.allNotices.notices,
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
    filters: state.filters.filters,
    position: state.current.currentPosition,
    user: state.user.user
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
    },
    deleteNotice: (id, type = 'new') => {
      dispatch(deleteNotice(id, type))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeListView)
