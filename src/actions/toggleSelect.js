import { TOGGLE_SELECT } from '../constants/action-types'

function toggleSelectFunc(noticeId, isSelected) {
  return {
    type: TOGGLE_SELECT,
    payload: {
      noticeId: noticeId,
      isSelected: isSelected
    }
  }
}

export const toggleSelect = (noticeId, isSelected) => {
  return dispatch => {
    dispatch(toggleSelectFunc(noticeId, isSelected))
  }
}
