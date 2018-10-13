'use strict'
import {
  ACTION_COMPETITION_GETALL,
  ACTION_COMPETITION_CREATE
} from '../constants/actionType'

import CompetitionHandler from '../utils/CompetitionHandler'

/**
 * get all competitions
 * @param
 */
export function getAllCompetitions() {
  return dispatch => {
    CompetitionHandler.getAll(competitions => {
      dispatch({ type: ACTION_COMPETITION_GETALL, payload: { competitions } })
    })
  }
}

/**
 *
 * @param {FormData} newCompetition
 */
export function createCompetition(newCompetition, callback) {
  return dispatch => {
    CompetitionHandler.create(newCompetition, (success, payload) => {
      callback(success, payload.message)
      if (success) {
        dispatch({ type: ACTION_COMPETITION_CREATE, payload })
      }
    })
  }
}
