import { SELECT_ALL } from '../constants/action-types'

function selectAllFunc(selectAllActive) {
  return {
    type: SELECT_ALL,
    payload: {
      selectAllActive: selectAllActive
    }
  }
}

export const selectAll = selectAllActive => {
  return dispatch => {
    dispatch(selectAllFunc(selectAllActive))
  }
}
