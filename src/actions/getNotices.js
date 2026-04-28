import {
    importantNoticesUrl,
    bookmarkedNoticesUrl,
    expiredNoticesUrl,
    filterUrl,
    noticesUrl,
    dateFilterUrl
} from '../urls'
import { toast } from 'react-semantic-toasts'
import { no_of_notices } from '../const'

function requestNotices(page, searchKeyword, sortMode) {
    return {
        type: 'FETCH_NOTICES_REQUEST',
        payload: {
            page: page,
            searchKeyword: searchKeyword,
            sortMode: sortMode
        }
    }
}

function receiveNotices(
    noticeDataList,
    searchKeyword,
    narrowBookmark,
    expired,
    bannerId,
    dateRange,
    mainCategorySlug,
    showImp,
    sortMode
) {
    let totalPages = Math.ceil(noticeDataList.count / no_of_notices)
    if (totalPages === 0) {
        // The total pages can't be 0 in Pagination component
        totalPages = 1
    }

    return {
        type: 'FETCH_NOTICES_SUCCESS',
        payload: {
            narrowBookmark: narrowBookmark,
            expired: expired,
            bannerId: bannerId,
            mainCategorySlug: mainCategorySlug,
            dateRange: dateRange,
            notices: noticeDataList.results,
            importantUnreadCount: noticeDataList.importantUnreadCount,
            searchKeyword: searchKeyword,
            sortMode: sortMode,
            totalPages: totalPages,
            showImp: showImp
        }
    }
}

export const getNotices = () => (dispatch, getState) => {
    const page = getState().notices.page
    const searchKeyword = getState().notices.searchKeyword
    const narrowBookmark = getState().notices.narrowBookmark
    const expired = getState().notices.expired
    const bannerId = getState().notices.bannerId
    const mainCategorySlug = getState().notices.mainCategorySlug
    const dateRange = getState().notices.dateRange
    const showImp = getState().notices.showImp
    const sortMode = getState().notices.sortMode || 'date'

    dispatch(requestNotices(page, searchKeyword, sortMode))
    let url
    if (expired) {
        url = expiredNoticesUrl(page, searchKeyword, sortMode)
    } else if (dateRange) {
        url = dateFilterUrl(
            page,
            dateRange.start,
            dateRange.end,
            bannerId,
            mainCategorySlug,
            searchKeyword,
            sortMode
        )
    } else if (bannerId) {
        url = filterUrl(page, bannerId, searchKeyword, mainCategorySlug, sortMode)
    } else if (narrowBookmark) {
        url = bookmarkedNoticesUrl(page)
    } else if (showImp) {
        url = importantNoticesUrl(page, searchKeyword, sortMode)
    } else {
        url = noticesUrl(page, searchKeyword, sortMode)
    }

    return fetch(url)
        .then(response => response.json())
        .then(json =>
            dispatch(
                receiveNotices(
                    json,
                    searchKeyword,
                    narrowBookmark,
                    expired,
                    bannerId,
                    dateRange,
                    mainCategorySlug,
                    showImp,
                    sortMode
                )
            )
        )
        .catch(err => {
            dispatch({
                type: 'FETCH_NOTICES_FAILURE'
            })
            if (err.response) {
                err.response.data
                    ? toast({
                        type: 'error',
                        title: 'Failed to fetch notices!',
                        description: err.response.data.msg
                    })
                    : toast({
                        type: 'error',
                        title: 'Failed to fetch notices!',
                        description: err.response.statusText
                    })
            } else {
                toast({
                    type: 'error',
                    title: 'Failed to fetch notices!'
                })
            }
        })
}
