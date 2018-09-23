import axios from 'axios'
import { URL_USER_SIGNIN } from '../constants/url'

export default {
  // signup: (user, confirmPassword, callback) => {
  //   if (!user.username) {
  //     callback(false, 'Please enter username')
  //   } else if (!user.password) {
  //     callback(false, 'Please enter password')
  //   } else if (!confirmPassword) {
  //     callback(false, 'Please enter confirm password')
  //   } else if (user.password !== confirmPassword) {
  //     callback(false, 'The password do not match')
  //   } else {
  //     axios
  //       .post(URL_USER_SIGNUP, user)
  //       .then(res => {})
  //       .catch(err => {})
  //   }
  // },
  // signin: (user, callback) => {
  //   if (!user.username) {
  //     callback(false, 'Please enter username')
  //   } else if (!user.password) {
  //     callback(false, 'Please enter password')
  //   } else {
  //     axios
  //       .post(URL_USER_SIGNIN, user)
  //       .then(res => {
  //         console.log(res)
  //         sessionStorage.token = res.data.token
  //         sessionStorage.user = JSON.stringify(res.data.resUser)
  //         callback(true, 'Sign in successfully')
  //       })
  //       .catch(err => {
  //         callback(false, err.response.data.message)
  //       })
  //   }
  // },
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
