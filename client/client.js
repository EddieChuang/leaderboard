'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
// import storageSession from 'redux-persist/lib/storage/session'
import reducers from './reducers/index'
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'

require('./style/main.scss')

const midddleware = applyMiddleware(thunk, logger)
const initialState = window.INITIAL_STATE
const store = createStore(reducers, initialState, midddleware)

const Routes = <Provider store={store}>{routes}</Provider>

ReactDOM.render(Routes, document.getElementById('app'))
