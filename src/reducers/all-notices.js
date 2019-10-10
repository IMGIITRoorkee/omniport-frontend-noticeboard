import {
  GET_NOTICES,
  REQUEST_NOTICES,
  BOOKMARK_NOTICE,
  SELECT_ALL,
  TOGGLE_SELECT,
  READ_NOTICE,
  UPLOAD_NOTICE_FAILURE,
  UPLOAD_NOTICE_SUCCESS,
  UPLOAD_NOTICE_REQUEST,
  SHOW_IMP,
  HIDE_IMP
} from '../constants/action-types'

const initialState = {
  page: 1,
  isFetchingNotices: true,
  totalPages: 0,
  notices: [],
  importantNotices: [],
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
  error: ''
}

const allNotices = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IMP:
      return {
        ...state,
        showImp: true
      }

    case HIDE_IMP:
      return {
        ...state,
        showImp: false
      }

    case GET_NOTICES:
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
        dateRange: action.payload.dateRange
      }
      if (action.payload.showImp)
        newState['importantNotices'] = action.payload.notices
      else newState['notices'] = action.payload.notices

      return newState

    case REQUEST_NOTICES:
      return {
        ...state,
        isFetchingNotices: true,
        page: action.payload.page,
        searchKeyword: action.payload.searchKeyword
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

      for (let index = 0; index < noticeIdList.length; index++) {
        for (let i = 0; i < state.importantNotices.length; i++) {
          if (state.importantNotices[i].id === noticeIdList[index]) {
            state.importantNotices[i].starred = action.payload.toggle
          }
        }
      }
      return { ...state }

    case READ_NOTICE:
      notice_id_list = action.payload.notice_id_list

      for (let index = 0; index < notice_id_list.length; index++) {
        for (let i = 0; i < state.notices.length; i++) {
          if (state.notices[i].id === notice_id_list[index]) {
            state.notices[i].read = action.payload.toggle
          }
        }
      }

      for (let index = 0; index < notice_id_list.length; index++) {
        for (let i = 0; i < state.importantNotices.length; i++) {
          if (state.importantNotices[i].id === notice_id_list[index]) {
            state.importantNotices[i].read = action.payload.toggle
          }
        }
      }

      return { ...state }

    case SELECT_ALL:
      let selectedNotices = []
      selectAllActive = action.payload.selectAllActive

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

    default:
      return state
  }
}

export default allNotices
