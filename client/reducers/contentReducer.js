'use strict'
import {
  ACTION_CONTENT_SWITCH,
  ACTION_COMPETITION_SWITCH
} from '../constants/actionType'

export function contentReducer(state = { contentId: '0', itemId: '' }, action) {
  switch (action.type) {
    case ACTION_CONTENT_SWITCH:
      return { ...state, ...action.payload }
    case ACTION_COMPETITION_SWITCH:
      return { ...state, ...action.payload }
  }

  return state
}
