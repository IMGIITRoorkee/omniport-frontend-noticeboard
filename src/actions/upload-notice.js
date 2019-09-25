import axios from 'axios'
import { getCookie } from 'formula_one'
import { urlUploadNotice } from '../urls'
import {
  UPLOAD_NOTICE_FAILURE,
  UPLOAD_NOTICE_REQUEST,
  UPLOAD_NOTICE_SUCCESS
} from '../constants/action-types'

export default function uploadNotice(data, callback) {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: UPLOAD_NOTICE_REQUEST
    })
    axios
      .post(urlUploadNotice(), data, { headers: headers })
      .then(res => {
        dispatch({
          type: UPLOAD_NOTICE_SUCCESS
        })
        callback()
      })
      .catch(err => {
        dispatch({
          type: UPLOAD_NOTICE_FAILURE,
          payload: {
            error: err
          }
        })
      })
  }
}
