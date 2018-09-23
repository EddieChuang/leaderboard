'use strict'
import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { contentReducer } from './contentReducer'

const reducers = combineReducers({
  user: userReducer,
  content: contentReducer
})

export default reducers
