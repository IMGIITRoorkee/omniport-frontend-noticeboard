import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './components/app'
import rootReducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default class AppRouter extends Component {
  constructor (props) {
    super(props)
    this.store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))
  }

  render () {
    const { match } = this.props
    return (
      <Provider store={this.store}>
        <Route path={`${match.path}/`} component={App} />

        {/* Default Route */}
      </Provider>
    )
  }
}
