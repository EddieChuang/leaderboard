import axios from 'axios'
import { URL_EXERCISE_ADD, URL_EXERCISE_GET } from '../constants/url'
import auth from '../utils/auth'

export default {
  getExercises: callback => {
    axios
      .post(URL_EXERCISE_GET, { token: auth.getToken() })
      .then(res => {
        callback(true, '', res.data.exercises)
      })
      .catch(err => {
        callback(false, res.response.data.message)
      })
  },
  addExercise: (newExercise, callback) => {
    axios
      .post(URL_EXERCISE_ADD, newExercise)
      .then(res => {
        console.log(res)
        callback(true, res.data.message, res.data.newExercise)
      })
      .catch(err => {
        console.log(err.response)
        if (err.response.status === 403) {
          alert('請重新登入')
          auth.signout()
          window.location = '/signin'
        } else {
          callback(false, err.response.data.message)
        }
      })
  }
}
