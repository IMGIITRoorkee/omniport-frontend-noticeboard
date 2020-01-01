import { GET_NOTICES, REQUEST_NOTICES } from '../constants/action-types'
import {
  urlImportantNotices,
  urlBookmarkedNotices,
  urlExpiredNotices,
  urlFilter,
  urlNotices,
  urlDateFilter
} from '../urls'
import { toast } from 'react-semantic-toasts'
// import { urlWhoAmI, urlGetMaintainers, getCookie } from 'formula_one'

function requestNotices(page, searchKeyword) {
  return {
    type: REQUEST_NOTICES,
    payload: {
      page: page,
      searchKeyword: searchKeyword
    }
  }
}

function receiveNotices(
  page,
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
    type: GET_NOTICES,
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
      page: page,
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
      url = urlExpiredNotices(page, searchKeyword)
    } else if (dateRange) {
      url = urlDateFilter(
        page,
        dateRange.start,
        dateRange.end,
        bannerId,
        mainCategorySlug,
        searchKeyword
      )
    } else if (bannerId) {
      url = urlFilter(page, bannerId, searchKeyword, mainCategorySlug)
    } else if (narrowBookmark) {
      url = urlBookmarkedNotices(page)
    } else if (showImp) {
      url = urlImportantNotices(page)
    } else {
      url = urlNotices(page, searchKeyword)
    }

    return fetch(url)
      .then(response => response.json())
      .then(json =>
        dispatch(
          receiveNotices(
            page,
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
