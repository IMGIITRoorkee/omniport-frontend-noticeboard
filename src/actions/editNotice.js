import axios from 'axios'
import { getCookie } from 'formula_one'
import { noticeIdUrl } from '../urls'
import { toast } from 'react-semantic-toasts'

export const editNotice = (id, data, callback, fetchNotice) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: 'EDIT_NOTICE_REQUEST'
    })
    axios
      .put(noticeIdUrl(id), data, { headers: headers })
      .then(res => {
        dispatch({
          type: 'EDIT_NOTICE_SUCCESS'
        })
        callback(fetchNotice ? res.data.id : '')
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
