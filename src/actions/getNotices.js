import axios from 'axios'
import { toast } from 'react-semantic-toasts'
import { noticesUrl } from '../urls'

export const getNotices = (page) =>  (dispatch) => {
    axios
        .get(noticesUrl(page))
        .then(response => {
            // dispatch(console.log(response.data.results))
            let totalPages = Math.ceil(respone.data.results.count / 10)
            if (totalPages === 0) {
                // The total pages can't be 0 in Pagination component
                totalPages = 1
            }
            dispatch({
                type: 'FETCH_NOTICES_SUCCESS',
                payload: {
                    notices: response.data.results,
                    totalPages: totalPages
                }
            })
        })
}