import { GET_FILTERS } from '../constants/action-types'

const initialState = {
  filters: []
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILTERS:
      return {
        ...state,
        filters: action.payload.filters
      }
    default:
      return state
  }
}

export default filters
