import axios from 'axios'
import { getCookie } from 'formula_one'
import { urlUploadNotice } from '../urls'
import {
  UPLOAD_NOTICE_FAILURE,
  UPLOAD_NOTICE_REQUEST,
  UPLOAD_NOTICE_SUCCESS
} from '../constants/action-types'
import { toast } from 'react-semantic-toasts'

export const uploadNotice = (data, callback) => {
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
        if (err.response) {
          err.response.data
            ? toast({
              type: 'error',
              title: 'Failed to upload the notice!',
              description: err.response.data.msg
            })
            : toast({
              type: 'error',
              title: 'Failed to upload the notice!',
              description: err.response.statusText
            })
        } else {
          toast({
            type: 'error',
            title: 'Failed to upload the notice!'
          })
        }
      })
  }
}
