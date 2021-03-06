import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import 'todomvc-app-css/index.css'
import TestUtils from 'expose?TestUtils!react-addons-test-utils'

const store = configureStore()

window.App = render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
