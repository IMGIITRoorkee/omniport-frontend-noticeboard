import { TOGGLE_SIDEBAR } from '../constants/action-types'

export const toggleSidenav = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_SIDEBAR
    })
  }
}
