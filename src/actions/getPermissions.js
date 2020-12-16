import axios from 'axios'
import { getCookie } from 'formula_one'
import { permissionsUrl } from '../urls'
import { toast } from 'react-semantic-toasts'

export const getPermissions = () => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  return dispatch => {
    dispatch({
      type: 'FETCH_PERMISSION_REQUEST'
    })
    axios
      .get(permissionsUrl(), { headers: headers })
      .then(res => {
        dispatch({
          type: 'FETCH_PERMISSION',
          payload: res.data
        })
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
