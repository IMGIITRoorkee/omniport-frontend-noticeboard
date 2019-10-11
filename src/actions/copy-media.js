import axios from 'axios'
import { getCookie } from 'formula_one'
import { urlCopyMedia } from '../urls'

export const copyMedia = (data, callback) => {
  let headers = {
    'X-CSRFToken': getCookie('csrftoken')
  }
  axios
    .post(urlCopyMedia(), data, { headers: headers })
    .then(res => {
      callback({
        success: true,
        path: res.data && res.data.path
      })
    })
    .catch(err => {
      callback({
        success: false
      })
    })
}
