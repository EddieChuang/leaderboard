import axios from 'axios'
import { URL_USER_SIGNIN } from '../constants/url'

export default {
  signout: callback => {
    delete sessionStorage.token
    delete sessionStorage.user
    callback()
  },

  signined: () => {
    return !!sessionStorage.token
  },
  getUser: () => JSON.parse(sessionStorage.user),
  isStudent: () => JSON.parse(sessionStorage.user).type === 'student',
  isInstructor: () => JSON.parse(sessionStorage.user).type === 'instructor',
  getToken: () => sessionStorage.token
}
