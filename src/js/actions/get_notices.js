import { GET_NOTICES, REQUEST_NOTICES } from "../constants/action-types";

function requestNotices(page) {
    return {
        type: REQUEST_NOTICES,
        payload: {
            page: page,
            is_fetching_notices: true
        }
    }
}

function receiveNotices(page, notice_data_list) {
  return {
    type: GET_NOTICES,
    payload: {
        notices: notice_data_list.results,
        total_pages: Math.floor(notice_data_list.count/10)+1,
        page: page,
    }
  }
}

export default function GetNotices(page) {
  return (dispatch) => {
    dispatch(requestNotices(page));
    return fetch(`http://192.168.121.228:60031/noticeboard/new/?page=${page}`)
      .then(response => response.json())
      .then(json => dispatch(receiveNotices(page, json)))
  }
}