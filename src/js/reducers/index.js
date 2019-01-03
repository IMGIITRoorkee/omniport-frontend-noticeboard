import {GET_NOTICES, REQUEST_NOTICES, GET_NOTICE, REQUEST_NOTICE, BOOKMARK_NOTICE} from "../constants/action-types";
import { combineReducers } from 'redux'


const initialState = {
    page: 1,
    is_fetching_notices: true,
    is_fetching_notice: true,
    total_pages: 0,
    notices: [],
};

function GetNoticesReducer(state = initialState, action) {

  console.log(action);

  switch (action.type) {
      case GET_NOTICES:
          return Object.assign({}, state, {
              notices: action.payload.notices,
              is_fetching_notices: false,
              page: action.payload.page,
              total_pages: action.payload.total_pages
          });
      case REQUEST_NOTICES:
          return { ...state, is_fetching_notices: true};
      default:
          return state;
  }
}

function GetNoticeReducer(state=initialState, action) {

  console.log(state, action);

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
    console.log(state, action);
    console.log(state.notices);

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