import {
  FETCH_NOTICE_FAILURE,
  FETCH_NOTICE_SUCCESS,
  FETCH_NOTICE_REQUEST,
  PDF_PATH
} from '../constants/action-types'

const initialState = {
  isFetchingNotice: false,
  notice: '',
  noticeExists: null,
  noticeId: '',
  pdfPath: ''
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
        pdfPath: action.payload.notice.pdfPath
      }
    case FETCH_NOTICE_FAILURE:
      return {
        ...state,
        isFetchingNotice: false
      }
    case PDF_PATH:
      return {
        ...state,
        pdfPath: action.payload.pdfPath
      }
    default:
      return state
  }
}

export default notice
