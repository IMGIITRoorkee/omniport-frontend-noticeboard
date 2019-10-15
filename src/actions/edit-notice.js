import axios from 'axios'
import { getCookie } from 'formula_one'
import { urlNoticeId } from '../urls'
import {
  EDIT_NOTICE_FAILURE,
  EDIT_NOTICE_REQUEST,
  EDIT_NOTICE_SUCCESS
} from '../constants/action-types'

export const editNotice = (id, data, callback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: EDIT_NOTICE_REQUEST
    })
    axios
      .put(urlNoticeId(id), data, { headers: headers })
      .then(res => {
        dispatch({
          type: EDIT_NOTICE_SUCCESS
        })
        callback()
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? dispatch({
                type: EDIT_NOTICE_FAILURE,
                payload: {
                  error: err.response.data.msg
                }
              })
            : dispatch({
                type: EDIT_NOTICE_FAILURE,
                payload: {
                  error: err.response.statusText
                }
              })
        }
      })
  }
}
