import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from './js/components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
