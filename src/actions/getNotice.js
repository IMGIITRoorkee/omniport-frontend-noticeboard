import axios from 'axios'
import { noticeUrl, starReadUrl } from '../urls'
import { getCookie } from 'formula_one'
import { toast } from 'react-semantic-toasts'
import { ifRole } from 'formula_one'

function requestNotice(noticeId) {
    return {
        type: "FETCH_NOTICE_REQUEST",
        payload: {
            noticeId: noticeId
        }
    }
}

function receiveNotice(noticeData, noticeExists) {
    return {
        type: "FETCH_NOTICE_SUCCESS",
        payload: {
            notice: noticeData,
            noticeExists: noticeExists
        }
    }
}

export const getNotice = (noticeId, expired = false, callback = () => {null}) => (dispatch, getState) => {
    let roles = getState().user && getState().user.user ? getState().user.user.roles : 'Guest'
    dispatch(requestNotice(noticeId))
    return fetch(noticeUrl(noticeId, expired))
        .then(response => response.json())
        .then(json => {
            if (json.detail !== 'Not found.') {
                dispatch(receiveNotice(json, true))
                if (!expired) {
                    if (!json.read && roles && ifRole(roles, 'Guest') !== 'IS_ACTIVE') {
                        let headers = {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken')
                        }
                        let body = JSON.stringify({
                            keyword: 'read',
                            notices: [json.id]
                        })
                        axios
                            .post(starReadUrl(), body, {
                                headers: headers
                            })
                            .catch(err => {
                                if (err.response) {
                                    err.response.data
                                        ? toast({
                                            type: 'error',
                                            title: 'Failed to read notice!',
                                            description: err.response.data.msg
                                        })
                                        : toast({
                                            type: 'error',
                                            title: 'Failed to read notice!',
                                            description: err.response.statusText
                                        })
                                } else {
                                    toast({
                                        type: 'error',
                                        title: 'Failed to read notice!'
                                    })
                                }
                            })
                    }
                }
                callback()
            } else {
                dispatch(receiveNotice(null, false))
            }
        })
        .catch(err => {
            dispatch({
                type: "FETCH_NOTICE_FAILURE"
            })
            if (err.response) {
                err.response.data
                    ? toast({
                        type: 'error',
                        title: 'Failed to fetch notice!',
                        description: err.response.data.msg
                    })
                    : toast({
                        type: 'error',
                        title: 'Failed to fetch notice!',
                        description: err.response.statusText
                    })
            } else {
                toast({
                    type: 'error',
                    title: 'Failed to fetch notice!'
                })
            }
        })
}
