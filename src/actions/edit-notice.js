import axios from 'axios'
import { getCookie } from 'formula_one'
import { urlNoticeId } from '../urls'
import {
  EDIT_NOTICE_REQUEST,
  EDIT_NOTICE_SUCCESS
} from '../constants/action-types'
import { toast } from 'react-semantic-toasts'

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
            ? toast({
                type: 'error',
                title: 'Failed to edit notice!',
                description: err.response.data.msg
              })
            : toast({
                type: 'error',
                title: 'Failed to edit notice!',
                description: err.response.statusText
              })
        } else {
          toast({
            type: 'error',
            title: 'Failed to edit notice!'
          })
        }
      })
  }
}
