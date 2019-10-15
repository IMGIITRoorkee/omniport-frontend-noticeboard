import { REQUEST_NOTICE, GET_NOTICE } from '../constants/action-types'

const initialState = {
  isFetchingNotice: false,
  notice: '',
  noticeExists: null,
  noticeId: ''
}

const notice = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NOTICE:
      return {
        ...state,
        isFetchingNotice: true,
        noticeId: action.payload.noticeId
      }
    case GET_NOTICE:
      return {
        ...state,
        isFetchingNotice: false,
        notice: action.payload.notice,
        noticeExists: action.payload.noticeExists
      }
    default:
      return state
  }
}

export default notice
