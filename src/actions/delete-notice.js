import { getCookie } from 'formula_one'
import { urlNoticeId } from '../urls'

import {
  DELETE_NOTICE_REQUEST,
  DELETE_NOTICE_SUCCESS
} from '../constants/action-types'
import { toast } from 'react-semantic-toasts'

export const deleteNotice = (id, type, callback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: DELETE_NOTICE_REQUEST
    })
    fetch(urlNoticeId(id, type), {
      method: 'DELETE',
      headers: headers
    })
      .then(res => {
        dispatch({
          type: DELETE_NOTICE_SUCCESS,
          payload: {
            id: id
          }
        })
        callback()
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? toast({
                type: 'error',
                title: 'Failed to delete notice!',
                description: err.response.data.msg
              })
            : toast({
                type: 'error',
                title: 'Failed to delete notice!',
                description: err.response.statusText
              })
        } else {
          toast({
            type: 'error',
            title: 'Failed to delete notice!'
          })
        }
      })
  }
}
