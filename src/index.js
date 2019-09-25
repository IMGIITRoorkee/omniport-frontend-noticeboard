import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import App from './components/app.js'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers'

export default class AppRouter extends Component {
  constructor(props) {
    super(props)
    
    const initialState = {}
    const middleware = [thunk]
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    this.store = createStore(
      rootReducers,
      initialState,
      composeEnhancers(applyMiddleware(...middleware))
    )
  }

  render() {
    const { match } = this.props
    return (
      <Provider store={this.store}>
        <Route path={`${match.path}/`} component={App} />
      </Provider>
    )
  }
}
