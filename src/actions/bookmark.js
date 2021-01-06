import { getCookie } from 'formula_one'
import { starReadUrl } from '../urls'
import { toast } from 'react-semantic-toasts'
import { star_keyword, unstar_keyword } from '../const'

function bookmarkNotice (noticeIdList, toggle) {
  return {
    type: 'BOOKMARK_NOTICE',
    payload: {
      noticeIdList: noticeIdList,
      toggle: toggle
    }
  }
}

export const noticeBookmark = (noticeIdList, toggle) => {
  return (dispatch) => {
    let headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    }
    let keyword

    if (toggle) {
      keyword = star_keyword
    } else {
      keyword = unstar_keyword
    }

    let body = JSON.stringify({
      keyword: keyword,
      notices: noticeIdList
    })
    return fetch(starReadUrl(), {
      method: 'post',
      headers: headers,
      body: body
    })
      .then(response => dispatch(bookmarkNotice(noticeIdList, toggle)))
      .catch(err => {
        if (err.response) {
          err.response.data
            ? toast({
                type: 'error',
                title:
                  keyword === star_keyword
                    ? 'Unable to bookmark!'
                    : 'Delete bookmark failed!'
              })
            : toast({
                type: 'error',
                title:
                  keyword === star_keyword
                    ? 'Unable to bookmark!'
                    : 'Delete bookmark failed!'
              })
        } else {
          toast({
            type: 'error',
            title:
              keyword === star_keyword
                ? 'Unable to bookmark!'
                : 'Delete bookmark failed!'
          })
        }
      })
  }
}



