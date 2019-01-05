import {GET_NOTICES, REQUEST_NOTICES, GET_NOTICE, REQUEST_NOTICE, BOOKMARK_NOTICE} from "../constants/action-types";
import { combineReducers } from 'redux'


const initialState = {
    page: 1,
    is_fetching_notices: true,
    is_fetching_notice: true,
    total_pages: 0,
    notices: [],
    search_keyword: null,
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
              total_pages: action.payload.total_pages
          });
      case REQUEST_NOTICES:
          return { ...state,
              is_fetching_notices: true,
              page: action.payload.page,
              search_keyword: action.payload.search_keyword};
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

function BookmarkReducer(state=initialState, action) {

    switch (action.type) {
        case BOOKMARK_NOTICE:
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    GetNotices : GetNoticesReducer,
    GetNotice: GetNoticeReducer,
    BookmarkNotice: BookmarkReducer
});

export default rootReducer;