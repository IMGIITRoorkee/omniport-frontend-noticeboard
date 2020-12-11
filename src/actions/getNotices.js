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

function requestNotices(page, searchKeyword) {
    return {
        type: 'FETCH_NOTICES_REQUEST',
        payload: {
            page: page,
            searchKeyword: searchKeyword
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
    showImp
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

    dispatch(requestNotices(page, searchKeyword))
    let url
    if (expired) {
        url = expiredNoticesUrl(page, searchKeyword)
    } else if (dateRange) {
        url = dateFilterUrl(
            page,
            dateRange.start,
            dateRange.end,
            bannerId,
            mainCategorySlug,
            searchKeyword
        )
    } else if (bannerId) {
        url = filterUrl(page, bannerId, searchKeyword, mainCategorySlug)
    } else if (narrowBookmark) {
        url = bookmarkedNoticesUrl(page)
    } else if (showImp) {
        url = importantNoticesUrl(page)
    } else {
        url = noticesUrl(page, searchKeyword)
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
                    showImp
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
