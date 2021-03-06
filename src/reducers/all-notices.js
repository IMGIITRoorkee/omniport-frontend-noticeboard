import {
  FETCH_NOTICES_SUCCESS,
  FETCH_NOTICES_REQUEST,
  FETCH_NOTICES_FAILURE,
  BOOKMARK_NOTICE,
  SELECT_ALL,
  TOGGLE_SELECT,
  READ_NOTICE,
  UPLOAD_NOTICE_FAILURE,
  UPLOAD_NOTICE_SUCCESS,
  UPLOAD_NOTICE_REQUEST,
  SHOW_IMP,
  HIDE_IMP,
  EDIT_NOTICE_FAILURE,
  EDIT_NOTICE_REQUEST,
  EDIT_NOTICE_SUCCESS,
  DELETE_NOTICE_FAILURE,
  DELETE_NOTICE_REQUEST,
  DELETE_NOTICE_SUCCESS,
  RESET_PAGE,
  TOGGLE_SIDEBAR
} from '../constants/action-types'
import { isMobile } from 'react-device-detect'

const initialState = {
  page: 1,
  isFetchingNotices: true,
  totalPages: 0,
  importantUnreadCount: 0,
  notices: [],
  showImp: false,
  searchKeyword: null,
  isLoaded: false,
  expired: false,
  narrowBookmark: false,
  bannerId: null,
  dateRange: null,
  selectAllActive: false,
  selectedNotices: [],
  mainCategorySlug: false,
  isUploading: false,
  error: '',
  sidenavOpen: !isMobile
}

const allNotices = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IMP:
      return {
        ...state,
        showImp: true,
        narrowBookmark: false,
        bannerId: null,
        expired: false
      }

    case HIDE_IMP:
      return {
        ...state,
        showImp: false
      }

    case DELETE_NOTICE_SUCCESS:
      let newNotices = state.notices.filter(
        notice => notice.id !== action.payload.id
      )
      return {
        ...state,
        notices: newNotices
      }

    case DELETE_NOTICE_REQUEST:
      return {
        ...state
      }

    case DELETE_NOTICE_FAILURE:
      return {
        ...state
      }

    case FETCH_NOTICES_SUCCESS:
      let newState = {
        ...state,
        searchKeyword: action.payload.searchKeyword,
        isFetchingNotices: false,
        selectAllActive: false,
        page: action.payload.page,
        expired: action.payload.expired,
        totalPages: action.payload.totalPages,
        narrowBookmark: action.payload.narrowBookmark,
        bannerId: action.payload.bannerId,
        mainCategorySlug: action.payload.mainCategorySlug,
        dateRange: action.payload.dateRange,
        notices: action.payload.notices,
        importantUnreadCount: action.payload.importantUnreadCount
      }

      return newState

    case FETCH_NOTICES_REQUEST:
      return {
        ...state,
        isFetchingNotices: true,
        notices: [],
        page: action.payload.page,
        searchKeyword: action.payload.searchKeyword
      }

    case FETCH_NOTICES_FAILURE:
      return {
        ...state,
        isFetchingNotices: false
      }
    case BOOKMARK_NOTICE:
      let noticeIdList = action.payload.noticeIdList

      for (let index = 0; index < noticeIdList.length; index++) {
        for (let i = 0; i < state.notices.length; i++) {
          if (state.notices[i].id === noticeIdList[index]) {
            state.notices[i].starred = action.payload.toggle
          }
        }
      }
      return { ...state }

    case READ_NOTICE:
      noticeIdList = action.payload.noticeIdList

      for (let index = 0; index < noticeIdList.length; index++) {
        for (let i = 0; i < state.notices.length; i++) {
          if (state.notices[i].id === noticeIdList[index]) {
            state.notices[i].read = action.payload.toggle
          }
        }
      }
      return { ...state }

    case SELECT_ALL:
      selectAllActive = action.payload.selectAllActive
      let selectedNotices = []
      for (let i = 0; i < state.notices.length; i++) {
        if (selectAllActive) {
          selectedNotices.push(state.notices[i].id)
        }
      }

      return {
        ...state,
        selectedNotices: selectedNotices,
        selectAllActive: selectAllActive
      }

    case TOGGLE_SELECT:
      selectedNotices = state.selectedNotices
      let noticeId = action.payload.noticeId
      let selectAllActive = false

      if (selectedNotices.includes(noticeId)) {
        let index = selectedNotices.indexOf(noticeId)
        if (index !== -1) {
          selectedNotices.splice(index, 1)
        }
      } else {
        selectedNotices.push(noticeId)
      }
      if (selectedNotices.length > 0) {
        selectAllActive = true
      }

      return {
        ...state,
        selectedNotices: selectedNotices,
        selectAllActive: selectAllActive
      }
    case UPLOAD_NOTICE_FAILURE:
      return {
        ...state,
        isUploading: false,
        error: action.payload
      }
    case UPLOAD_NOTICE_SUCCESS:
      return {
        ...state,
        isUploading: false
      }
    case UPLOAD_NOTICE_REQUEST:
      return {
        ...state,
        isUploading: true
      }

    case EDIT_NOTICE_FAILURE:
      return {
        ...state,
        isUploading: false,
        error: action.payload
      }
    case EDIT_NOTICE_SUCCESS:
      return {
        ...state,
        isUploading: false
      }
    case EDIT_NOTICE_REQUEST:
      return {
        ...state,
        isUploading: true
      }
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidenavOpen: !state.sidenavOpen
      }
    default:
      return state
  }
}

export default allNotices
