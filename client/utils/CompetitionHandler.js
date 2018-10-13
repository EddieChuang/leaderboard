import axios from 'axios'
import {
  URL_COMPETITION_GETALL,
  URL_COMPETITION_CREATE,
  URL_COMPETITION_GET
} from '../constants/url'
import auth from '../utils/auth'

export default {
  get: (competitionId, callback) => {
    axios
      .post(URL_COMPETITION_GET, { token: auth.getToken(), competitionId })
      .then(res => {
        console.log(res)
        callback(res.data.competition)
      })
      .catch(err => {
        console.log(err.response)
        alert(err.response.data.message)
      })
  },
  getAll: callback => {
    axios
      .post(URL_COMPETITION_GETALL, { token: auth.getToken() })
      .then(res => {
        console.log(res)
        callback(res.data.competitions)
      })
      .catch(err => {
        console.log(err.response)
        alert(err.response.data.message)
      })
  },

  /**
   *
   * @param {FormData} newCompetition
   * @param {Function} callback
   */
  create: (newCompetition, callback) => {
    const config = { headers: { token: auth.getToken() } }
    axios
      .post(
        `${URL_COMPETITION_CREATE}/${newCompetition.get('title')}`,
        newCompetition,
        config
      )
      .then(res => {
        console.log(res)
        callback(true, res.data) // data = { status, message, competition: {_id, title} }
      })
      .catch(err => {
        console.log(err.response)
        callback(false, err.response.data)
        // if (err.response.status === 403) {
        //   alert('請重新登入')
        //   auth.signout()
        //   window.location = '/signin'
        // } else {
        //   callback(false, err.response.data.message)
        // }
      })
  }
}
