import { ADD_NOTICE } from "../constants/action-types";

const initialState = {
   notices: [
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
   ]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTICE:
      return { ...state, notices: [...state.notices, action.payload] };
    default:
      return state;
  }
};

export default rootReducer;
