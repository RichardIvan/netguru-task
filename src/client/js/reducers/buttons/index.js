/* @flow */
'use strict'

// import {
//   Map
// } from 'immutable'

import {
  NEW_WORD
} from '../../actions/constants'

export function fillButton (letter: string) {
  // console.log('aha')
  // console.log(letter ? 'active' : '')
  return {
    class: letter ? 'active' : '',
    letter: letter ? letter : ''
  }
}

const array = new Array(11).fill('')
const filledArray = array.map(fillButton)

// temporarry
// const empty = new Array(4).fill('')
// const initial = empty.map(fillButton).concat('hangman'.split('').map(fillButton))

export const initialState = {
  buttonData: filledArray
}

// has new word action type

const reducer = (state = initialState, action) => {
  if (!action || !action.type) return state
  switch (action.type) {
    case NEW_WORD: {
      const word = action.payload.word.split('')
      const wordLength = word.length
      const numberOfEmptyButtons = 11 - wordLength
      let emptyButtons = new Array(numberOfEmptyButtons).fill('')
      emptyButtons = emptyButtons.map(fillButton)
      const array = emptyButtons.concat(word.map(fillButton))
      const newState = {
        ...state,
        buttonData: array
      }
      return newState
    }
    default:
      return state
  }
}

export default reducer
