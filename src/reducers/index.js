import {
    GET_NOTICES,
    REQUEST_NOTICES,
    GET_NOTICE,
    REQUEST_NOTICE,
    BOOKMARK_NOTICE,
    GET_FILTERS
} from "../constants/action-types";
import { combineReducers } from 'redux'


const initialState = {
    page: 1,
    is_fetching_notices: true,
    is_fetching_notice: true,
    total_pages: 0,
    notices: [],
    search_keyword: null,
    isLoaded: false,
    expired: false,
    narrow_bookmark: false,
    banner_id: null,
    filters: [],
};

function GetNoticesReducer(state = initialState, action) {

  switch (action.type) {
      case GET_NOTICES:
          return Object.assign({}, state, {
              ...state,
              notices: action.payload.notices,
              search_keyword: action.payload.search_keyword,
              is_fetching_notices: false,
              page: action.payload.page,
              expired: action.payload.expired,
              total_pages: action.payload.total_pages,
              narrow_bookmark: action.payload.narrow_bookmark,
              banner_id: action.payload.banner_id,
          });

      case REQUEST_NOTICES:
          return { ...state,
              is_fetching_notices: true,
              page: action.payload.page,
              search_keyword: action.payload.search_keyword};

      case BOOKMARK_NOTICE:
          for (let i = 0; i < state.notices.length; i++) {
              if (state.notices[i].id === action.payload.notice_id) {
                   state.notices[i].starred = !state.notices[i].starred;
              }
          }
          return {...state};
      default:
          return state;
  }
}

function GetNoticeReducer(state=initialState, action) {

  switch (action.type) {
      case REQUEST_NOTICE:
          return {
              ...state,
              is_fetching_notice: true,
              notice_id: action.payload.notice_id
          };
      case GET_NOTICE:
          return {
               ...state,
              is_fetching_notice: false,
              notice: action.payload.notice
          };
      default:
          return state;
  }
}

function GetFiltersReducer(state=initialState, action) {
  switch (action.type) {
      case GET_FILTERS:
          return {
              ...state,
              filters: action.payload.filters
          };
      default:
          return state;
  }
}

const rootReducer = combineReducers({
    GetNotices : GetNoticesReducer,
    GetNotice: GetNoticeReducer,
    GetFilters: GetFiltersReducer,
});

export default rootReducer;