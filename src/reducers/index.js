import { combineReducers } from 'redux'
import noticesReducer from './noticesReducer'
import filtersReducer from './filtersReducer'
import whoAmI from './whoAmI'
import positionReducer from './positionReducer'
import permissionsReducer from './permissionsReducer'

const rootReducers = combineReducers({
  notices: noticesReducer,
  user: whoAmI,
  filters: filtersReducer,
  position: positionReducer,
  permission: permissionsReducer
})

export default rootReducers
