import { SET_CURRENT_POSITION } from '../constants/action-types'

function setPositionFunc(position, subPosition) {
  return {
    type: SET_CURRENT_POSITION,
    payload: position,
    other: subPosition
  }
}

export const setPosition = (position = '', subPosition = '') => {
  return dispatch => {
    dispatch(setPositionFunc(position, subPosition))
  }
}
