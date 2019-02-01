import { GET_NOTICES, REQUEST_NOTICES } from "../constants/action-types";
import {
    urlBookmarkedNotices,
    urlExpiredNotices, urlFilter,
    urlNotices, urlDateFilter
} from "../urls";
import { urlWhoAmI, urlGetMaintainers, getCookie } from 'formula_one'


function requestNotices(page, search_keyword) {
    return {
        type: REQUEST_NOTICES,
        payload: {
            page: page,
            search_keyword: search_keyword,
            is_fetching_notices: true
        }
    }
}

function receiveNotices(page, notice_data_list, search_keyword,
                        narrow_bookmark, expired, banner_id, date_range) {

    let total_pages = Math.ceil(notice_data_list.count/10);
    if (total_pages == 0) {
        // The total pages can't be 0 in Pagination component
        total_pages = 1;
    }
    
    return {
        type: GET_NOTICES,
        payload: {
            narrow_bookmark: narrow_bookmark,
            expired: expired,
            banner_id: banner_id,
            date_range: date_range,
            notices: notice_data_list.results,
            search_keyword: search_keyword,
            total_pages: total_pages,
            page: page,
        }
    }
}

export default function GetNotices(page, search_keyword, narrow_bookmark, expired, banner_id, date_range) {
  return (dispatch) => {
    dispatch(requestNotices(page, search_keyword));
    let url;

    if (expired) {
        url = urlExpiredNotices(page, search_keyword);
    } else if (date_range) {
        url = urlDateFilter(page, date_range.start, date_range.end, banner_id, search_keyword)
    } else if (banner_id){
        url = urlFilter(page, banner_id, search_keyword);
    } else if (narrow_bookmark) {
        url = urlBookmarkedNotices(page);
    } else {
        url = urlNotices(page, search_keyword);
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveNotices(page, json, search_keyword, narrow_bookmark, expired, banner_id, date_range)))
  }
}