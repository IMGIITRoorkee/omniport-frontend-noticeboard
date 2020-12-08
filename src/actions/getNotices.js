// import axios from 'axios'
// import { toast } from 'react-semantic-toasts'
// import { noticesUrl } from '../urls'
// import { no_of_notices } from '../const'

// export const getNotices = (page) =>  (dispatch) => {
//     axios
//         .get(noticesUrl(page))
//         .then(response => {
//             // dispatch(console.log(no_of_notices))
//             let totalPages = Math.ceil(response.data.count / no_of_notices)
//             if (totalPages === 0) {
//                 // The total pages can't be 0 in Pagination component
//                 totalPages = 1
//             }
//             dispatch({
//                 type: 'FETCH_NOTICES_SUCCESS',
//                 payload: {
//                     notices: response.data.results,
//                     totalPages: totalPages
//                 }
//             })
//         })
//         .catch(err => {
//             dispatch({
//                 type: FETCH_NOTICES_FAILURE
//             })
//             if (err.response) {
//                 err.response.data
//                     ? toast({
//                         type: 'error',
//                         title: 'Failed to fetch notices!',
//                         description: err.response.data.msg
//                     })
//                     : toast({
//                         type: 'error',
//                         title: 'Failed to fetch notices!',
//                         description: err.response.statusText
//                     })
//             } else {
//                 toast({
//                     type: 'error',
//                     title: 'Failed to fetch notices!'
//                 })
//             }
//         })
// }


import {
    importantNoticesUrl,
    bookmarkedNoticesUrl,
    expiredNoticesUrl,
    filterUrl,
    noticesUrl,
    dateFilterUrl
} from '../urls'
import { toast } from 'react-semantic-toasts'

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
    let totalPages = Math.ceil(noticeDataList.count / 10)
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

export const getNotices = (
    page,
    searchKeyword,
    narrowBookmark,
    expired,
    bannerId,
    mainCategorySlug,
    dateRange,
    showImp
) => {
    return dispatch => {
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
}
