import axios from 'axios'
import { getCookie } from 'formula_one'
import { urlPermissions } from '../urls'
import {
  FETCH_PERMISSION,
  FETCH_PERMISSION_REQUEST
} from '../constants/action-types'

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
      .catch(err => {})
  }
}
