import axios from 'axios'
import { toast } from 'react-semantic-toasts'
import { noticesUrl } from '../urls'
import { no_of_notices } from '../const'

export const getNotices = (page) =>  (dispatch) => {
    axios
        .get(noticesUrl(page))
        .then(response => {
            // dispatch(console.log(no_of_notices))
            let totalPages = Math.ceil(response.data.count / no_of_notices)
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