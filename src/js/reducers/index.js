import {GET_NOTICES, REQUEST_NOTICES} from "../constants/action-types";
import { combineReducers } from 'redux'

const sample_notices = [
            {id : 1, title: "Unit Info", time: "8:00 PM", date: "today", banner: "DOSW"},
            {id : 2, title: "Schedule of company", time: "7:30 PM", date: "Sept 18", banner: "Placement office"},
            {id : 3, title: "Guest Lecture on Plasma", time: "11:00 AM", date: "Oct 19", banner: "Physics"},
            {id : 4, title: "Blood donation camp", time: "8:00 PM", date: "Yesterday", banner: "NSS"},
            {id : 5, title: "Unit Info", time: "8:00 PM", date: "today", banner: "Academic Section"},
            {id : 6, title: "Call for interviews", time: "8:00 PM", date: "today", banner: "Dean SRIC"},
            {id : 7, title: "Scholarship openings", time: "8:00 PM", date: "today", banner: "Scholarship"},
            {id : 8, title: "Scholarship openings", time: "8:00 PM", date: "today", banner: "Scholarship"},
            {id : 9, title: "Scholarship", time: "4:00 PM", date: "today", banner: "Department"},
            {id : 10, title: "Scholarship openings", time: "8:00 PM", date: "today", banner: "Scholarship"},
];

const initialState = {
    page: 1,
    is_fetching_notices: true,
    total_pages: 1,
};

function GetNoticeReducer(state = 'reactjs', action) {

  switch (action.type) {
      case GET_NOTICES:
          return {
              notices: sample_notices,
              is_fetching_notices: false,
              page: action.payload.page,
              total_pages: 30
          };
      case REQUEST_NOTICES:
          return {is_fetching_notices: true, total_pages: 30};
      default:
          return initialState;
  }
}

const rootReducer = combineReducers({
    GetNotice : GetNoticeReducer
});

export default rootReducer;
