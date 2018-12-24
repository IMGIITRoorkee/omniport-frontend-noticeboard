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


function receiveNotices(page, notices) {

  return {
    type: GET_NOTICES,
    payload: {
        notices: notices,
        page: page
    }
  }
}

export default function GetNotices(page) {
  return (dispatch) => {
    dispatch(requestNotices(page));
    return fetch(`https://reqres.in/api/users?page=${page}`)
      .then(response => response.json())
      .then(json => dispatch(receiveNotices(page, json.data)))
  }
}