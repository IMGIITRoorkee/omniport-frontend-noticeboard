import { GET_NOTICES, REQUEST_NOTICES } from "../constants/action-types";

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

function receiveNotices(page, notice_data_list, search_keyword) {
    return {
        type: GET_NOTICES,
        payload: {
            notices: notice_data_list.results,
            search_keyword: search_keyword,
            total_pages: Math.floor(notice_data_list.count/10)+1,
            page: page,
        }
    }
}

export default function GetNotices(page, search_keyword) {
  return (dispatch) => {
    dispatch(requestNotices(page));
    let url;

    if (search_keyword === undefined) {
        url = `http://192.168.121.228:60031/noticeboard/new/?page=${page}`;
    } else {
        url = `http://192.168.121.228:60031/noticeboard/new/?page=${page}&keyword=${search_keyword}`;
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveNotices(page, json, search_keyword)))
  }
}