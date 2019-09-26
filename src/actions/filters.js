import { GET_FILTERS } from '../constants/action-types'
import { urlFilterList } from '../urls'

function receiveFilters(filters) {
  return {
    type: GET_FILTERS,
    payload: {
      filters: filters
    }
  }
}

export const getFilters = () => {
  return dispatch => {
    return fetch(urlFilterList())
      .then(response => response.json())
      .then(json => dispatch(receiveFilters(json)))
  }
}
