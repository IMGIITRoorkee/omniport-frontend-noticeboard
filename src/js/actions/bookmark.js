import { BOOKMARK_NOTICE } from "../constants/action-types";


export default function BookmarkNotice(notice_id, bookmark) {

  console.log(notice_id, bookmark);

  return {
    type: BOOKMARK_NOTICE,
    payload: {
        notice_id: notice_id,
        bookmark: bookmark
    }
  }
}