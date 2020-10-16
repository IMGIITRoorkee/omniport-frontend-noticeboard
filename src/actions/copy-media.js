import axios from 'axios'
import { getCookie } from 'formula_one'
import { urlCopyMedia } from '../urls'
import { toast } from 'react-semantic-toasts'
import { MEDIA_PATH } from '../constants/action-types'

export const copyMedia = (data, callback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
  axios
    .post(urlCopyMedia(), data, { headers: headers })
    .then(res => {
      dispatch({
        type: MEDIA_PATH,
        payload: {
          mediaPath: res.data && res.data.mediaPath 
        }
      })
      callback({
        success: true,
        path: res.data && res.data.path,
        mediaPath: res.data && res.data.mediaPath
      })
    })
    .catch(err => {
      callback({
        success: false
      })
      if (err.response) {
        err.response.data
          ? toast({
              type: 'error',
              title: 'Failed to copy media!',
              description: err.response.data.msg
            })
          : toast({
              type: 'error',
              title: 'Failed to copy media!',
              description: err.response.statusText
            })
      } else {
        toast({
          type: 'error',
          title: 'Failed to copy media!'
        })
      }
    })
  }
}
