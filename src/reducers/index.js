import { combineReducers } from 'redux'
import exampleReducer from './exampleReducer'
import noticesReducer from './noticesReducer'

const rootReducers = combineReducers({
  exampleReducer,
  notices: noticesReducer
})

export default rootReducers
