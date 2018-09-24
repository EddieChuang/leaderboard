'use strict'
import {
  ACTION_CONTENT_SWITCH,
  ACTION_COMPETITION_SWITCH
} from '../constants/actionType'

export function switchContent(contentId) {
  // dashboard: 0
  // competition: 1
  return dispatch => {
    dispatch({ type: ACTION_CONTENT_SWITCH, payload: { contentId } })
  }
}

export function switchCompetition(competitionId) {
  // newCompetition: -1
  return dispatch => {
    dispatch({
      type: ACTION_COMPETITION_SWITCH,
      payload: { contentId: '1', competitionId }
    })
  }
}
