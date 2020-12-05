import { combineReducers } from 'redux'
import noticesReducer from './noticesReducer'
import filtersReducer from './filtersReducer'
import whoAmI from './whoAmI'

const rootReducers = combineReducers({
  notices: noticesReducer,
  user: whoAmI,
  filters: filtersReducer,
})

export default rootReducers
