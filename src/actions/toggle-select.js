import { TOGGLE_SELECT } from '../constants/action-types'

function toggleSelectFunc(noticeId) {
  return {
    type: TOGGLE_SELECT,
    payload: {
      noticeId: noticeId
    }
  }
}

export const toggleSelect = noticeId => {
  return dispatch => {
    dispatch(toggleSelectFunc(noticeId))
  }
}
