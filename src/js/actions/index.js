import { ADD_NOTICE } from "../constants/action-types";

export const addNotice = notice => ({
    type: ADD_NOTICE, payload: notice
});
