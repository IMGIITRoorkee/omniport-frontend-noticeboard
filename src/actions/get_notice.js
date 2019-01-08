import { GET_NOTICE, REQUEST_NOTICE } from "../constants/action-types";
import { urlNotice, urlStarRead } from "../urls";
import { urlWhoAmI, urlGetMaintainers, getCookie } from 'formula_one';


function requestNotice(notice_id) {
    return {
        type: REQUEST_NOTICE,
        payload: {
            notice_id: notice_id,
            is_fetching_notice: true
        }
    }
}

function receiveNotice(notice_data) {
  return {
    type: GET_NOTICE,
    payload: {
        notice: notice_data
    }
  }
}

export default function GetNotice(notice_id, expired) {
  return (dispatch) => {
    let url;

    dispatch(requestNotice(notice_id));
    return fetch(urlNotice(notice_id, expired))
      .then(response => response.json())
      .then(json => dispatch(receiveNotice(json)))
      .then(json => {
         if (!expired) {
          if (!json.payload.notice.read) {
           let headers = {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken')
           }
           let body = JSON.stringify({
               keyword: 'read',
               notices: [json.payload.notice.id]
           })
           fetch(urlStarRead(),
           {method: 'post', headers: headers, body: body})};
          }
      })
  }
}