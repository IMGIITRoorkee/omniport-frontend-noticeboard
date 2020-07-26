import { GET_FILTERS } from '../constants/action-types'
import { urlFilterList } from '../urls'
import { toast } from 'react-semantic-toasts'

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
      .catch(err => {
        if (err.response) {
          err.response.data
            ? toast({
                type: 'error',
                title: 'Failed to fetch filters!',
                description: err.response.data.msg
              })
            : toast({
                type: 'error',
                title: 'Failed to fetch filters!',
                description: err.response.statusText
              })
        } else {
          toast({
            type: 'error',
            title: 'Failed to fetch filters!'
          })
        }
      })
  }
}
