import { GET_USER } from '../constants/action-types'

const initialState = {
  user: ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export default user
