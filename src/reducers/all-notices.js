import {
  GET_NOTICES,
  REQUEST_NOTICES,
  BOOKMARK_NOTICE,
  SELECT_ALL,
  TOGGLE_SELECT,
  READ_NOTICE
} from '../constants/action-types'

const initialState = {
  page: 1,
  isFetchingNotices: true,
  totalPages: 0,
  notices: [],
  searchKeyword: null,
  isLoaded: false,
  expired: false,
  narrowBookmark: false,
  bannerId: null,
  dateRange: null,
  selectAllActive: false,
  selectedNotices: [],
  mainCategorySlug: false
}

const allNotices = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICES:
      let notices = action.payload.notices
      for (let i = 0; i < notices.length; i++) {
        notices[i]['is_selected'] = false
      }
      return {
        ...state,
        notices: notices,
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
      return { ...state }

    case SELECT_ALL:
      let selectedNotices = []
      selectAllActive = action.payload.selectAllActive

      for (let i = 0; i < state.notices.length; i++) {
        state.notices[i]['is_selected'] = selectAllActive
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
      let notice_id = action.payload.notice_id
      let is_selected = action.payload.is_selected
      let selectAllActive = false

      for (let i = 0; i < state.notices.length; i++) {
        if (state.notices[i].id === notice_id) {
          state.notices[i].is_selected = is_selected
        }
      }

      if (selectedNotices.includes(notice_id)) {
        let index = selectedNotices.indexOf(notice_id)
        if (index !== -1) {
          selectedNotices.splice(index, 1)
        }
      } else {
        selectedNotices.push(notice_id)
      }

      if (selectedNotices.length > 0) {
        selectAllActive = true
      }

      return {
        ...state,
        selectedNotices: selectedNotices,
        selectAllActive: selectAllActive
      }

    default:
      return state
  }
}

export default allNotices
