import { READ_NOTICE } from "../constants/action-types";
import { urlWhoAmI, urlGetMaintainers, getCookie } from 'formula_one';
import { urlStarRead } from "../urls";


function ReadNotice(notice_id_list, toggle) {

  return {
    type: READ_NOTICE,
    payload: {
        notice_id_list: notice_id_list,
        toggle: toggle
    }
  }
}

export default function NoticeRead(notice_id_list, toggle) {

  return (dispatch) => {
     let headers = {
         'Content-Type': 'application/json',
         'X-CSRFToken': getCookie('csrftoken')
     };
     let keyword = 'read';

     let body = JSON.stringify({
         keyword: keyword,
         notices: notice_id_list
     });
     return fetch(urlStarRead(),
           {method: 'post', headers: headers, body: body})
         .then(response => dispatch(ReadNotice(notice_id_list, toggle)));
  }
}