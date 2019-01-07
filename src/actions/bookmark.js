import { BOOKMARK_NOTICE } from "../constants/action-types";
import { urlWhoAmI, urlGetMaintainers, getCookie } from 'formula_one';
import { urlNotice, urlStarRead } from "../urls";


function BookmarkNotice(notice_id, bookmark) {

  return {
    type: BOOKMARK_NOTICE,
    payload: {
        notice_id: notice_id,
        bookmark: bookmark
    }
  }
}

export default function NoticeBookmark(notice_id, bookmark) {

  return (dispatch) => {
     let headers = {
         'Content-Type': 'application/json',
         'X-CSRFToken': getCookie('csrftoken')
     };
     let keyword;

     if (bookmark) {
         keyword = 'star';
     } else {
         keyword = 'unstar';
     }

     let body = JSON.stringify({
         keyword: keyword,
         notices: [notice_id]
     });
     return fetch(urlStarRead(),
           {method: 'post', headers: headers, body: body})
         .then(response => dispatch(BookmarkNotice(notice_id, bookmark)));
  }
}