import axios from 'axios'

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
        console.log(err)
      })
  }
}
