import { SET_CURRENT_POSITION } from '../constants/action-types'

const initialState = {
  currentPosition: 'home',
  subPosition: ''
}

const currentPosition = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_POSITION:
      return {
        currentPosition: action.payload,
        subPosition: action.other
      }
    default:
      return state
  }
}

export default currentPosition
