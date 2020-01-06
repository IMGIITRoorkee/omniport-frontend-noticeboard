import axios from 'axios'
import { getCookie } from 'formula_one'
import { urlPermissions } from '../urls'
import {
  FETCH_PERMISSION,
  FETCH_PERMISSION_REQUEST
} from '../constants/action-types'
import { toast } from 'react-semantic-toasts'

export const getPermissions = callback => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: FETCH_PERMISSION_REQUEST
    })
    axios
      .get(urlPermissions(), { headers: headers })
      .then(res => {
        dispatch({
          type: FETCH_PERMISSION,
          payload: res.data
        })
        callback()
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? toast({
              type: 'error',
              title: 'Failed to fetch permissions!',
              description: err.response.data.msg
            })
            : toast({
              type: 'error',
              title: 'Failed to fetch permissions!',
              description: err.response.statusText
            })
        }
      })
  }
}
