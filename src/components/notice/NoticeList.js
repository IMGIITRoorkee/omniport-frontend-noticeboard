import React, { Component } from 'react'

import { Container, Button, Icon, Segment, Table, Pagination, Loader } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import NoticeCell from './NoticeCell'
import { getNotices } from '../../actions/getNotices'
import { toggleAllNotices } from '../../actions/selectNotices'
import { noticeBookmark } from '../../actions/bookmark'
import { noticeRead } from '../../actions/readNotices'
import { setFilters } from '../../actions/setFilters'
import { setPosition } from '../../actions/setPosition'
import { iconName, headingName } from '../../utils'

import notice from '../../css/notice.css'
import filters from '../../../../noticeboard-old/src/reducers/filters'


class NoticeList extends Component {

    setNoticeFilters = () => {
        const { getNotices, setFilters, setPosition } = this.props
        const url = location.pathname.split('/')
        let [showImp, expired, narrowBookmark, mainCategorySlug, bannerId, position, subPosition] = [false, false,false, false, null, 'home', null]
        if(url[2]) {
            position = url[2]
            if(url[2]=='important'){
                showImp = true
            }
            else if(url[2]=='expired'){
                expired = true
            }
            else if(url[2]=='bookmark'){
                narrowBookmark = true
            }
            else if(url[2]!=''){
                bannerId = url[2]
                subPosition = url[2]
                if(isNaN(url[2])){
                    mainCategorySlug = true
                }
            }
        }
        const query = new URLSearchParams(location.search)
        const page = query.get('page')
        const date = query.get('date')
        let dateRange, dateFilter
        if(date){
            dateRange = date.split('/')
            dateFilter = {
                start: dateRange[0],
                end: dateRange[1]
            }
        }
        const searchKeyword = query.get('search')
        setPosition(position)
        setFilters(page, dateFilter, searchKeyword, showImp, expired, narrowBookmark, mainCategorySlug, bannerId)
        getNotices()
    }

    componentDidMount() {
        this.setNoticeFilters()
        this.unlisten = this.props.history.listen((location) => {
            this.setNoticeFilters()
        });
        
    }

    componentWillUnmount() {
        this.unlisten();
    }   

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.setNoticeFilters()
        }
    }

    handlePaginationChange = (e, data) => {
        const { pathname } = this.props.location
        this.props.history.push(`${pathname}?page=${data.activePage}`)
    }

    changeMark = () => {
        this.setState({
            mark: !this.state.mark
        })
    }

    toggleSelectAll = () => {
        this.props.toggleAllNotices()
    }
    
    changeBookmark = (toggle) => {
        const { selectedNotices, noticeBookmark, toggleAllNotices } = this.props
        noticeBookmark(selectedNotices, toggle)
        toggleAllNotices()
    }

    readNotices = () => {
        const { noticeRead, selectedNotices, toggleAllNotices } = this.props
        noticeRead(selectedNotices)
        toggleAllNotices()
    }

    render() {
        const { 
            pages, 
            history, 
            isFetchingNotices, 
            notices, 
            selectAllActive, 
            page, 
            expired, 
            bannerId, 
            dateRange, 
            filters,
            position 
        } = this.props
        let bannerName, dateDisplay
        if (bannerId && filters.length > 0) {
            for (let index = 0; index < filters.length; index++) {
                for (let j = 0; j < filters[index].banner.length; j++) {
                    if (bannerId == filters[index].banner[j].id) {
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
            <>
                <div styleName='notice.notice-list'>
                    <Container styleName='notice.notice-container-width'>
                        <div styleName='notice.notice-type-heading'>
                            <Icon name={iconName(position)} color='blue' />
                            <span>{headingName(position)}</span>
                        </div>
                    </Container>
                    <React.Fragment>
                        {notices && notices.length?
                            <Container styleName='notice.select-all-container notice.notice-container-width'>
                                {selectAllActive ?
                                    (
                                        <div>
                                            <Button
                                                icon
                                                styleName='notice.select-all-button-activated notice.select-all-button notice.tab-button'
                                                onClick={this.toggleSelectAll}
                                            >
                                                <Icon name='square' color='blue'></Icon>
                                            </Button>
                                            <Segment styleName='notice.select-all-list notice.select-all-activated-list'>
                                                <Button
                                                    basic
                                                    styleName='notice.tab-button'
                                                    icon
                                                    onClick={this.readNotices}
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
                                                    onClick={() => this.changeBookmark(true)}
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
                                                    onClick={() => this.changeBookmark(false)}
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
                                    )
                                    :
                                    (
                                        <div styleName='notice.table-row'>
                                            <Button
                                                icon
                                                styleName='notice.select-all-button-not-activated  notice.select-all-button'
                                                onClick={this.toggleSelectAll}
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
                                    )
                                }
                            </Container>
                        : null}
                    </React.Fragment>
                    {isFetchingNotices?
                        (
                            <Container styleName='notice.notice-list-view notice.notice-list-loading notice.notice-container-width'>
                                <Loader active styleName='notice.loader-element' />
                            </Container>
                        )
                        :
                        (
                            <div>
                                {notices && notices.length?
                                    (
                                        <Container styleName='notice.notice-list-view notice.notice-container-width'>
                                            <Table basic celled singleLine compact unstackable selectable styleName='notice.table'>
                                                <Table.Body>
                                                    {notices && notices.map(noticeInfo => {
                                                        return (
                                                            <NoticeCell
                                                                key={noticeInfo.id}
                                                                id={noticeInfo.id}
                                                                date={noticeInfo.datetimeModified}
                                                                banner={noticeInfo.banner}
                                                                title={noticeInfo.title}
                                                                read={noticeInfo.read}
                                                                important={noticeInfo.isImportant}
                                                                bookmark={noticeInfo.starred}
                                                                uploader={noticeInfo.uploader}
                                                                history={history}
                                                                expired={expired}
                                                            />
                                                        )
                                                    })}
                                                </Table.Body>
                                            </Table>
                                        </Container>
                                    )
                                    :
                                    (
                                        <Container styleName='notice.notice-list-view notice.notice-container-width'>
                                            <div styleName='notice.notice-list-no-notice'>
                                                <h1 styleName='no-results-found'> No results found </h1>
                                            </div>
                                        </Container>
                                    )   
                                }             
                            </div>
                        )
                    }
                </div>

                <Container styleName='notice.pagination-box notice.notice-container-width'>
                    <Pagination
                        styleName='notice.pagination'
                        totalPages={pages}
                        firstItem={null}
                        activePage={page}
                        onPageChange={this.handlePaginationChange}
                        // defaultActivePage={this.page?this.page:1}
                        lastItem={null}
                    />
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetchingNotices: state.notices.isFetchingNotices,
        notices: state.notices.notices,
        selectAllActive: state.notices.selectAllActive,
        selectedNotices: state.notices.selectedNotices,
        page: state.notices.page,
        bannerId: state.notices.bannerId,
        dateRange: state.notices.dateRange,
        filters: state.filters.filters,
        position: state.position.position
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNotices: (page) => {
            dispatch(
                getNotices(page)
            )
        },
        toggleAllNotices: () => {
            dispatch(
                toggleAllNotices()
            )
        },
        noticeBookmark: (id, toggle) => {
            dispatch(noticeBookmark(id, toggle))
        },
        noticeRead: (list) => {
            dispatch(noticeRead(list))
        },
        setFilters: (page, dateFilter, searchKeyword, showImp, expired, narrowBookmark, mainCategorySlug, bannerId) => {
            dispatch(setFilters(page, dateFilter, searchKeyword, showImp, expired, narrowBookmark, mainCategorySlug, bannerId))
        },
        setPosition: (position) => {
            dispatch(setPosition(position))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoticeList))
