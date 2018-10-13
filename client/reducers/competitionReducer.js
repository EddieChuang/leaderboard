'use strict'
import {
  ACTION_CONTENT_SWITCH,
  ACTION_COMPETITION_CREATE
} from '../constants/actionType'

/* 
  competitions = [
    {
      title: '',
      id: ''
    }
  ]

*/
export function competitionReducer(
  state = { competitions: [], activeId: '' },
  action
) {
  switch (action.type) {
    case ACTION_COMPETITION_GETALL:
      return { ...state, ...action.payload }
    case ACTION_COMPETITION_CREATE:
      let competitions = [...state.competitions, action.payload.competition]
      return { ...state, competitions }
  }

  return state
}
