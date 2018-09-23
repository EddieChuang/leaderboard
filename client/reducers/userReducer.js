'use strict'
import {
  ACTION_SIGNUP,
  ACTION_SIGNIN,
  ACTION_SIGNUP_ERROR,
  ACTION_SIGNIN_ERROR
} from '../constants/actionType'

export function userReducer(state = { status: true, message: '' }, action) {
  switch (action.type) {
    case ACTION_SIGNIN:
      return {
        ...action.payload
      }
    case ACTION_SIGNUP:
      return {
        ...action.payload
      }
    case ACTION_SIGNUP_ERROR:
      return {
        ...action.payload
      }
    case ACTION_SIGNIN_ERROR:
      return {
        ...action.payload
      }
  }

  return state
}
