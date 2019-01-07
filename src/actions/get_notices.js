import { GET_NOTICES, REQUEST_NOTICES } from "../constants/action-types";
import {urlBookmarkedNotices, urlNotices, urlSearchNotices} from "../urls";
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

function receiveNotices(page, notice_data_list, search_keyword, narrow_bookmark) {


    return {
        type: GET_NOTICES,
        payload: {
            narrow_bookmark: narrow_bookmark,
            notices: notice_data_list.results,
            search_keyword: search_keyword,
            total_pages: Math.floor(notice_data_list.count/10)+1,
            page: page,
        }
    }
}

export default function GetNotices(page, search_keyword, narrow_bookmark) {
  return (dispatch) => {
    dispatch(requestNotices(page, search_keyword));
    let url;

    if (narrow_bookmark === undefined) {
        narrow_bookmark = false;
    }

    if (narrow_bookmark) {
        url = urlBookmarkedNotices(page);
    } else if (search_keyword === undefined) {
        url = urlNotices(page);
    } else {
        url = urlSearchNotices(page, search_keyword);
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveNotices(page, json, search_keyword, narrow_bookmark)))
  }
}