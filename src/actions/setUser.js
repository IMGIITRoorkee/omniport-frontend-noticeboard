import axios from 'axios'
import { urlWhoAmI } from 'formula_one/src/urls'

export const setUser = () => {
    return dispatch => {
        axios
            .get(urlWhoAmI())
            .then(res => {
                dispatch({
                    type: 'SET_USER',
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'SET_USER',
                    payload: null
                })
            })
    }
}