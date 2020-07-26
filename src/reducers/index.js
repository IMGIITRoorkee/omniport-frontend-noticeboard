import { combineReducers } from 'redux'
import allNotices from './all-notices'
import filters from './filters'
import notice from './notice'
import permission from './permission'
import user from './user'
import current from './current-position'

const rootReducer = combineReducers({
  allNotices,
  notice,
  filters,
  permission,
  user,
  current
})

export default rootReducer
