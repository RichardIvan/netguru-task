/* @flow */
'use strict'

// import {
//   Map
// } from 'immutable'

import {
  NEW_WORD,
  SELECTED_LETTER
} from '../../actions/constants'

// export function fillButton (letter: string) {
//   return {
//     class: letter ? 'active' : '',
//     letter: letter ? letter : ''
//   }
// }

// const array = new Array(11).fill('')
// const filledArray = array.map(fillButton)

// temporarry
// const empty = new Array(4).fill('')
// const initial = empty.map(fillButton).concat('hangman'.split('').map(fillButton))

export const initialState = {
  missedLetters: ['b', 'd', 'e', 'z', 'p', 'u', 'k', 'l', 'q', 'w', 'k', 'l', 'm'],
  gameInProgress: true
}

// has new word action type

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
