import {
  FETCH_NOTICE_FAILURE,
  FETCH_NOTICE_SUCCESS,
  FETCH_NOTICE_REQUEST,
  MEDIA_PATH
} from '../constants/action-types'

const initialState = {
  isFetchingNotice: false,
  notice: '',
  noticeExists: null,
  noticeId: '',
  mediaPath: ''
}

const notice = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTICE_REQUEST:
      return {
        ...state,
        isFetchingNotice: true,
        noticeId: action.payload.noticeId
      }
    case FETCH_NOTICE_SUCCESS:
      return {
        ...state,
        isFetchingNotice: false,
        notice: action.payload.notice,
        noticeExists: action.payload.noticeExists,
        mediaPath: action.payload.notice.mediaPath
      }
    case FETCH_NOTICE_FAILURE:
      return {
        ...state,
        isFetchingNotice: false
      }
    case MEDIA_PATH:
      return {
        ...state,
        mediaPath: action.payload.mediaPath
      }
    default:
      return state
  }
}

export default notice
