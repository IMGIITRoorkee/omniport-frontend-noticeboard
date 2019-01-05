import { GET_NOTICES, REQUEST_NOTICES } from "../constants/action-types";
import { urlNotices, urlSearchNotices } from "../urls";
import axios from 'axios'
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
    dispatch(requestNotices(page, search_keyword));
    let url;

    if (search_keyword === undefined) {
        url = urlNotices(page);
    } else {
        url = urlSearchNotices(page, search_keyword);
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveNotices(page, json, search_keyword)))
  }
}