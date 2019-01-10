import { TOGGLE_SELECT } from "../constants/action-types";

function toggleSelect(notice_id, is_selected) {

    return {
        type: TOGGLE_SELECT,
        payload: {
            notice_id: notice_id,
            is_selected: is_selected
        }
    }
}

export default function ToggleSelect(notice_id, is_selected) {
  return (dispatch) => {
      dispatch(toggleSelect(notice_id, is_selected));
  }
};