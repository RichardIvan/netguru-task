/* @flow */
'use strict'

// import {
//   Map
// } from 'immutable'

import {
  NEW_WORD
} from '../../actions/constants'

export const initialState = {
  missedLetters: [],
  gameInProgress: true
}

const reducer = (state = initialState, action) => {
  if (!action || !action.type) return state
  console.log(action)
  switch (action.type) {
    // resets the missed words list
    case NEW_WORD: {
      const newState = {
        ...state,
        missedLetters: [],
        gameInProgress: true
      }
      console.log(newState)
      return newState
    }
    default:
      return state
  }
}

export default reducer
