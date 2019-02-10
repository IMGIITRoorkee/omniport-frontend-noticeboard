import {
    GET_NOTICES,
    REQUEST_NOTICES,
    GET_NOTICE,
    REQUEST_NOTICE,
    BOOKMARK_NOTICE,
    GET_FILTERS,
    SELECT_ALL,
    TOGGLE_SELECT,
    READ_NOTICE
} from "../constants/action-types";
import { combineReducers } from 'redux'
import ToggleSelect from "../actions/toggle_select";
import notice from "../components/notice";


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
    date_range: null,
    select_all_active: false,
    selected_notices: [],
    notice_exists: null,
    main_category_slug: false,
};

function GetNoticesReducer(state = initialState, action) {
  switch (action.type) {
      case GET_NOTICES:

          let notices = action.payload.notices;
          for (let i = 0; i < notices.length; i++) {
              notices[i]['is_selected'] = false;
          }

          return Object.assign({}, state, {
              ...state,
              notices: notices,
              search_keyword: action.payload.search_keyword,
              is_fetching_notices: false,
              select_all_active: false,
              page: action.payload.page,
              expired: action.payload.expired,
              total_pages: action.payload.total_pages,
              narrow_bookmark: action.payload.narrow_bookmark,
              banner_id: action.payload.banner_id,
              main_category_slug: action.payload.main_category_slug,
              date_range: action.payload.date_range,
          });

      case REQUEST_NOTICES:
          return { ...state,
              is_fetching_notices: true,
              page: action.payload.page,
              search_keyword: action.payload.search_keyword};

      case BOOKMARK_NOTICE:
          let notice_id_list = action.payload.notice_id_list;

          for (let index=0; index < notice_id_list.length; index++) {
              for (let i = 0; i < state.notices.length; i++) {
                  if (state.notices[i].id === notice_id_list[index]) {
                      state.notices[i].starred = action.payload.toggle;
                  }
              }
          }
          return {...state};

      case READ_NOTICE:
          notice_id_list = action.payload.notice_id_list;

          for (let index=0; index < notice_id_list.length; index++) {
              for (let i = 0; i < state.notices.length; i++) {
                  if (state.notices[i].id === notice_id_list[index]) {
                      state.notices[i].read = action.payload.toggle;
                  }
              }
          }
          return {...state};

      case SELECT_ALL:
          let selected_notices = [];
          select_all_active = action.payload.select_all_active;

          for (let i = 0; i < state.notices.length; i++) {
              state.notices[i]['is_selected'] = select_all_active;
              if (select_all_active) {
                  selected_notices.push(state.notices[i].id)
              }
          }
          
          return {
              ...state,
              selected_notices: selected_notices,
              select_all_active: select_all_active,
          };

      case TOGGLE_SELECT:
          selected_notices = state.selected_notices;
          let notice_id = action.payload.notice_id;
          let is_selected = action.payload.is_selected;
          let select_all_active = false;

          for (let i = 0; i < state.notices.length; i++) {
              if (state.notices[i].id === notice_id) {
                   state.notices[i].is_selected = is_selected;
              }
          }

          if (selected_notices.includes(notice_id)) {
              let index = selected_notices.indexOf(notice_id);
              if (index !== -1) {
                  selected_notices.splice(index, 1);
              }
          } else {
              selected_notices.push(notice_id);
          }

          if (selected_notices.length > 0) {
              select_all_active = true;
          }

          return {
              ...state,
              selected_notices: selected_notices,
              select_all_active: select_all_active,
          };

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
              notice: action.payload.notice,
              notice_exists: action.payload.notice_exists,
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