'use strict'
import {
  ACTION_COMPETITION_CREATE,
  ACTION_COMPETITION_CREATE_FAILED,
  ACTION_CONTENT_CREATE,
  ACTION_COMPETITION_SWITCH
} from '../constants/actionType'

import CompetitionHandler from '../utils/CompetitionHandler'

/**
 *
 * @param {FormData} newCompetition
 */
export function createCompetition(newCompetition, callback) {
  return dispatch => {
    CompetitionHandler.create(newCompetition, (success, payload) => {
      callback(success, payload.message)
      if (success) {
        // dispatch({ type: ACTION_COMPETITION_CREATE, payload })
      } else {
        // dispatch({ type: ACTION_COMPETITION_CREATE_FAILED, payload })
      }
    })
  }
}
