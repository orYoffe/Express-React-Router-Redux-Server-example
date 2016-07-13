import React from 'react'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import indexReduxer from './js/reducers/index'

export function configureStore(history, initialState, isDev) {

  const reducer = combineReducers({
    app: indexReduxer,
    routing: routerReducer
  })

  const store = isDev ? createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history)
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  ) : createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history)
      )
    )
  );

  return store
}
