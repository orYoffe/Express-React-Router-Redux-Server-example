import 'babel-polyfill'
import './sass/index.scss'
import faviconUrl from 'file!./img/favicon.ico'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import routes from './js/routes'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './store'

const initialState = window.__INITIAL_STATE__
const store = configureStore(browserHistory, initialState, true)
const history = syncHistoryWithStore(browserHistory, store)

// fixing the favicon to get webpack's result file
document.getElementById('favicon').href = faviconUrl

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('root')
)
