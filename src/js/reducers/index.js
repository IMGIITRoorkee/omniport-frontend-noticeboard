import { ADD_NOTICE } from "../constants/action-types";

const initialState = {
   notices: []
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
