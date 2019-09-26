import { GET_NOTICE, REQUEST_NOTICE } from '../constants/action-types'
import { urlNotice, urlStarRead } from '../urls'
import { getCookie } from 'formula_one'

function requestNotice(noticeId) {
  return {
    type: REQUEST_NOTICE,
    payload: {
      noticeId: noticeId,
      isFetchingNotice: true
    }
  }
}

function receiveNotice(noticeData, noticeExists) {
  return {
    type: GET_NOTICE,
    payload: {
      notice: noticeData,
      noticeExists: noticeExists
    }
  }
}

export const getNotice = (noticeId, expired) => {
  return dispatch => {
    let url

    dispatch(requestNotice(noticeId))
    return fetch(urlNotice(noticeId, expired))
      .then(response => response.json())
      .then(json => {
        if (json.detail != 'Not found.') {
          dispatch(receiveNotice(json, true))

          if (!expired) {
            if (!json.read) {
              let headers = {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
              }
              let body = JSON.stringify({
                keyword: 'read',
                notices: [json.id]
              })
              fetch(urlStarRead(), {
                method: 'post',
                headers: headers,
                body: body
              })
            }
          }
        } else {
          dispatch(receiveNotice(null, false))
        }
      })
  }
}
