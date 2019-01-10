import { SELECT_ALL } from "../constants/action-types";


function selectAll(select_all_active) {

    return {
        type: SELECT_ALL,
        payload: {
            select_all_active: select_all_active,
        }
    }
}

export default function SelectAll(select_all_active) {
  return (dispatch) => {
      dispatch(selectAll(select_all_active));
  }
};