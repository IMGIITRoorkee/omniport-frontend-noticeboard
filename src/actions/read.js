import { READ_NOTICE } from '../constants/action-types'
import { getCookie } from 'formula_one'
import { urlStarRead } from '../urls'
import { toast } from 'react-semantic-toasts'

function readNotice(noticeIdList, toggle) {
  return {
    type: READ_NOTICE,
    payload: {
      noticeIdList: noticeIdList,
      toggle: toggle
    }
  }
}

export const noticeRead = (noticeIdList, toggle) => {
  return dispatch => {
    let headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    }
    let keyword = 'read'

    let body = JSON.stringify({
      keyword: keyword,
      notices: noticeIdList
    })
    return fetch(urlStarRead(), {
      method: 'post',
      headers: headers,
      body: body
    })
      .then(response => dispatch(readNotice(noticeIdList, toggle)))
      .catch(err => {
        if (err.response) {
          err.response.data
            ? toast({
                type: 'error',
                title: 'Something went wrong!',
                description: err.response.data.msg
              })
            : toast({
                type: 'error',
                title: 'Something went wrong!',
                description: err.response.statusText
              })
        } else {
          toast({
            type: 'error',
            title: 'Something went wrong!'
          })
        }
      })
  }
}
