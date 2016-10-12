/* @flow */
'use strict'

// import {
//   Map
// } from 'immutable'

import {
  NEW_WORD,
  SUBMIT_GUESS
} from '../../actions/constants'

import {
  fillButton
} from '../../helprs/game/'

import omit from 'lodash/omit'

const array = new Array(11).fill('')
const filledArray = array.map(fillButton)

export function takeOutGuessedItems (guessedLetter, duh, currentLetter) {
  return guessedLetter !== currentLetter
}

export function fillButtonByIndexes (array, indexes, letter) {
  //  return array.map((item, index) => {
  //    if (indexes.indexOf(index) !== -1) {
  //      return fillButton(letter)
  //    }
  //    return item
  //  })
  const copy = array.slice()
  indexes.forEach(occurenceIndex => {
    copy.splice(occurenceIndex, 1, fillButton(letter))
  })
  return copy
}

export const initialState = {
  buttonData: filledArray,
  lettersToGuess: {},
  word: '',
  numberOfIncorrectGuesses: 0,
  gameInProgress: true,
  missedLetters: []
}

// has new word action type

const reducer = (state = initialState, action) => {
  if (!action || !action.type) return state
  switch (action.type) {
    case NEW_WORD: {
      // const word = action.payload.word.split('')
      // const wordLength = word.length
      // const numberOfEmptyButtons = 11 - wordLength
      // let emptyButtons = new Array(numberOfEmptyButtons).fill('')
      // emptyButtons = emptyButtons.map(fillButton)
      // const array = emptyButtons.concat(word.map(fillButton))
      const newState = {
        ...state,
        missedLetters: [],
        gameInProgress: true,
        numberOfIncorrectGuesses: 0,
        buttonData: action.payload.newWordData.buttonData,
        lettersToGuess: action.payload.newWordData.lettersToGuess,
        word: action.payload.word
      }
      return newState
    }
    case SUBMIT_GUESS: {
      const guessedLetter = action.payload.letter
      const correctGuess = state.lettersToGuess[guessedLetter]

      if (!Array.isArray(correctGuess)) {
        const numberOfIncorrectGuesses = state.numberOfIncorrectGuesses + 1
        const shouldGameEnd = numberOfIncorrectGuesses < 11
        const shouldAddMissedLetter = state.missedLetters.indexOf(guessedLetter) === -1
        let newMissedLetters

        if (shouldAddMissedLetter) {
          newMissedLetters = state.missedLetters.slice(0)
          newMissedLetters.push(guessedLetter)
        }
        return {
          ...state,
          numberOfIncorrectGuesses,
          missedLetters: shouldAddMissedLetter ? newMissedLetters : state.missedLetters,
          gameInProgress: shouldGameEnd
        }
      } else {
        const remaindingLettersToGuess = omit(state.lettersToGuess, guessedLetter)
        const numberOfRemainingLettersToguess = Object.keys(remaindingLettersToGuess).length

        return {
          ...state,
          buttonData: fillButtonByIndexes(state.buttonData, correctGuess, guessedLetter),
          lettersToGuess: remaindingLettersToGuess,
          gameInProgress: numberOfRemainingLettersToguess > 0
        }
      }
    }
    default:
      return state
  }
}

export default reducer
