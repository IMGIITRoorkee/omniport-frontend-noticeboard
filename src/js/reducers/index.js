import {GET_NOTICES, REQUEST_NOTICES, GET_NOTICE, REQUEST_NOTICE, BOOKMARK_NOTICE} from "../constants/action-types";
import { combineReducers } from 'redux'

const sample_notices = [
            {id : 1, title: "Unit Info", time: "8:00 PM", bookmark: true, date: "today", banner: "DOSW", read: true},
            {id : 2, title: "Schedule of company", time: "7:30 PM", bookmark: true, read: true, date: "Sept 18", banner: "Placement office"},
            {id : 3, title: "Guest Lecture on Plasma", bookmark: false,read: false, time: "11:00 AM", date: "Oct 19", banner: "Physics"},
            {id : 4, title: "Blood donation camp", bookmark: true,read: true, time: "8:00 PM", date: "Yesterday", banner: "NSS"},
            {id : 5, title: "Unit Info", read: true, bookmark: true,time: "8:00 PM", date: "today", banner: "Academic Section"},
            {id : 6, title: "Call for interviews", bookmark: true,read: false, time: "8:00 PM", date: "today", banner: "Dean SRIC"},
            {id : 7, title: "Scholarship openings", bookmark: false,read: true, time: "8:00 PM", date: "today", banner: "Scholarship"},
            {id : 8, title: "Scholarship openings", read: false, bookmark: true,time: "8:00 PM", date: "today", banner: "Scholarship"},
            {id : 9, title: "Scholarship", time: "4:00 PM", read: true, bookmark: false,date: "today", banner: "Department"},
            {id : 10, title: "Scholarship openings", read: false, bookmark: true, time: "8:00 PM", date: "today", banner: "Scholarship"},
];

const sample_notice = {id: 1, title: "Unit Info", time: "8:00 PM", date: "today", banner: "DOSW",
                       content: "abweijcnn bjweifu 3neweivnj wejkwfenfwkjefn  wejfwnw"};

const initialState = {
    page: 1,
    is_fetching_notices: true,
    is_fetching_notice: true,
    total_pages: 1,
    notices: [],
};

function GetNoticesReducer(state = initialState, action) {

  switch (action.type) {
      case GET_NOTICES:
          return Object.assign({}, state, {
              notices: sample_notices,
              is_fetching_notices: false,
              page: action.payload.page,
              total_pages: 30
          });
      case REQUEST_NOTICES:
          return { ...state, is_fetching_notices: true, total_pages: 30};
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
              notice: sample_notice
          };
      default:
          return state;
  }
}

function BookmarkReducer(state=initialState, action) {
    console.log(state, action);
    console.log(initialState.notices);

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