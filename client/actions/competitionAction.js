'use strict'
import {
  ACTION_COMPETITION_CREATE,
  ACTION_CONTENT_CREATE,
  ACTION_COMPETITION_SWITCH
} from '../constants/actionType'

import CompetitionHandler from '../utils/CompetitionHandler'

/**
 *
 * @param {FormData} newCompetition
 */
export function createCompetition(newCompetition) {
  return dispatch => {
    CompetitionHandler.create(newCompetition, () => {})
  }
}
