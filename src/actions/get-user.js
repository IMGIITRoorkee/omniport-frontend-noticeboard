import axios from 'axios'

import { toast } from 'react-semantic-toasts'
import { GET_USER } from '../constants/action-types'
import { whoAmI } from '../urls'

export const getUser = () => {
  return dispatch => {
    axios
      .get(whoAmI())
      .then(res => {
        dispatch({
          type: GET_USER,
          payload: res.data
        })
      })
      .catch(err => {
        if (err.response) {
          err.response.data
            ? toast({
                type: 'error',
                title: 'Failed to fetch user!',
                description: err.response.data.msg
              })
            : toast({
                type: 'error',
                title: 'Failed to fetch user!',
                description: err.response.statusText
              })
        } else {
          toast({
            type: 'error',
            title: 'Failed to fetch user!'
          })
        }
      })
  }
}
