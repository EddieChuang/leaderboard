'use strict'
import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { contentReducer } from './contentReducer'
import { competitionReducer } from './competitionReducer'

const reducers = combineReducers({
  user: userReducer,
  content: contentReducer,
  competition: competitionReducer
})

export default reducers
