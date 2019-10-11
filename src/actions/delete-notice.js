import { getCookie } from 'formula_one'
import { urlUploadNotice } from '../urls'
import {
  DELETE_NOTICE_FAILURE,
  DELETE_NOTICE_REQUEST,
  DELETE_NOTICE_SUCCESS
} from '../constants/action-types'

export const deleteFile = (data, callback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: DELETE_NOTICE_REQUEST
    })
    fetch(urlUploadNotice(data), {
      method: 'DELETE',
      headers: headers
    })
      .then(res => {
        dispatch({
          type: DELETE_NOTICE_SUCCESS
        })
        callback()
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? dispatch({
                type: DELETE_NOTICE_FAILURE,
                payload: {
                  error: err.response.data.msg
                }
              })
            : dispatch({
                type: DELETE_NOTICE_FAILURE,
                payload: {
                  error: err.response.statusText
                }
              })
        }
      })
  }
}
