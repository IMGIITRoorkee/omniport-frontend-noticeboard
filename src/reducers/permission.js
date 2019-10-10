import {
  FETCH_PERMISSION_REQUEST,
  FETCH_PERMISSION
} from '../constants/action-types'

const initialState = {
  isFetching: false,
  permission: {}
}

const notice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PERMISSION_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_PERMISSION:
      return {
        ...state,
        isFetching: false,
        permission: action.payload
      }
    default:
      return state
  }
}

export default notice
