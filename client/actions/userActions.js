'use strict'
import axios from 'axios'
import { URL_USER_SIGNUP, URL_USER_SIGNIN } from '../constants/url'

import {
  ACTION_SIGNUP,
  ACTION_SIGNIN,
  ACTION_SIGNUP_ERROR,
  ACTION_SIGNIN_ERROR
} from '../constants/actionType'

export function signup(user, confirmPassword) {
  // user = { username, password }
  return dispatch => {
    const status = false
    if (!user.username) {
      const payload = { status, message: 'Please enter username' }
      dispatch({ type: ACTION_SIGNUP_ERROR, payload })
    } else if (!user.password) {
      const payload = { status, message: 'Please enter password' }
      dispatch({ type: ACTION_SIGNUP_ERROR, payload })
    } else if (!confirmPassword) {
      const payload = { status, message: 'Please enter confirm password' }
      dispatch({ type: ACTION_SIGNUP_ERROR, payload })
    } else if (user.password !== confirmPassword) {
      const payload = { status, message: 'The passwords do not match' }
      dispatch({ type: ACTION_SIGNUP_ERROR, payload })
    } else {
      axios
        .post(URL_USER_SIGNUP, user)
        .then(res => {
          console.log(res)
          const { status, message } = res.data
          dispatch({ type: ACTION_SIGNUP, payload: { status, message } }) // dispatch(action)
          window.location = '/signin'
        })
        .catch(err => {
          console.log(err)
          const { status, message } = err.response.data
          dispatch({ type: ACTION_SIGNUP_ERROR, payload: { status, message } })
        })
    }
  }
}

export function signin(user) {
  // user = { username, password }
  return dispatch => {
    const status = false
    if (!user.username) {
      const payload = { status, message: 'Please enter username' }
      dispatch({ type: ACTION_SIGNIN_ERROR, payload })
    } else if (!user.password) {
      const payload = { status, message: 'Please enter password' }
      dispatch({ type: ACTION_SIGNIN_ERROR, payload })
    } else {
      axios
        .post(URL_USER_SIGNIN, user)
        .then(res => {
          console.log(res)
          const { status, token, resUser, message } = res.data
          sessionStorage.token = token
          sessionStorage.user = JSON.stringify(resUser)

          dispatch({ type: ACTION_SIGNIN, payload: { status, message } }) // dispatch(action)
          window.location = '/home'
        })
        .catch(err => {
          const { status, message } = err.response.data
          dispatch({ type: ACTION_SIGNIN_ERROR, payload: { status, message } })
        })
    }
  }
}
