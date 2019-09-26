import { combineReducers } from 'redux'
import allNotices from './all-notices'
import filters from './filters'
import notice from './notice'

const rootReducer = combineReducers({
  allNotices,
  notice,
  filters
})

export default rootReducer
