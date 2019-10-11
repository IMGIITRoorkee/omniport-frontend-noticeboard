import { combineReducers } from 'redux'
import allNotices from './all-notices'
import filters from './filters'
import notice from './notice'
import permission from './permission'
import user from './user'

const rootReducer = combineReducers({
  allNotices,
  notice,
  filters,
  permission,
  user
})

export default rootReducer
