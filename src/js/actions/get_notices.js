import { GET_NOTICES, REQUEST_NOTICES, GET_NOTICE, REQUEST_NOTICE } from "../constants/action-types";

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
        notices: notice_data_list.data,
        total_pages: notice_data_list.total_pages,
        page: page,
    }
  }
}

export default function GetNotices(page) {
  return (dispatch) => {
    dispatch(requestNotices(page));
    return fetch(`https://reqres.in/api/users?page=${page}`)
      .then(response => response.json())
      .then(json => dispatch(receiveNotices(page, json)))
  }
}