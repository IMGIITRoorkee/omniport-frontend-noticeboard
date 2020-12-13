import { combineReducers } from 'redux'
import noticesReducer from './noticesReducer'
import filtersReducer from './filtersReducer'
import whoAmI from './whoAmI'
import positionReducer from './positionReducer'

const rootReducers = combineReducers({
  notices: noticesReducer,
  user: whoAmI,
  filters: filtersReducer,
  position: positionReducer
})

export default rootReducers
