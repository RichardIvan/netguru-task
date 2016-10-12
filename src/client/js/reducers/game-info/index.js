/* @flow */
'use strict'

// import {
//   Map
// } from 'immutable'

import {
  NEW_WORD,
  SUBMIT_GUESS,
  GAME_PROGRESS
} from '../../actions/constants'

import {
  fillButton
} from '../../helprs/game/'

import omit from 'lodash/omit'

const fillButtonWithActive = fillButton('active')

const array = new Array(11).fill('')
const filledArray = array.map(fillButtonWithActive)

export function takeOutGuessedItems (guessedLetter, duh, currentLetter) {
  return guessedLetter !== currentLetter
}

export function fillButtonByIndexes (classTofill) {

  const fillButtonWithSetClass = fillButton(classTofill)

  return (array, indexes, letter) => {
    //  return array.map((item, index) => {
    //    if (indexes.indexOf(index) !== -1) {
    //      return fillButton(letter)
    //    }
    //    return item
    //  })
    const copy = array.slice()
    indexes.forEach(occurenceIndex => {
      copy.splice(occurenceIndex, 1, fillButtonWithSetClass(letter))
    })
    return copy
  }
}

const fillButtonByIndexesWithActive = fillButtonByIndexes('active')
const fillButtonByIndexesWithMissing = fillButtonByIndexes('missed')

export const initialState = {
  buttonData: filledArray,
  lettersToGuess: {},
  word: '',
  numberOfIncorrectGuesses: 0,
  gameInProgress: true,
  missedLetters: []
}

const reducer = (state = initialState, action) => {
  if (!action || !action.type) return state
  switch (action.type) {
    case NEW_WORD: {
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
        const shouldGameEnd = numberOfIncorrectGuesses > 10
        const shouldAddMissedLetter = state.missedLetters.indexOf(guessedLetter) === -1
        let newMissedLetters
        let buttonData = state.buttonData

        if (shouldAddMissedLetter) {
          newMissedLetters = state.missedLetters.slice(0)
          newMissedLetters.push(guessedLetter)
        }

        if (shouldGameEnd) {
          // get keys
          const keys = Object.keys(state.lettersToGuess)

          // for each key fill indexes
          keys.forEach(letter => {
            const arrayOfIndexesInString = state.lettersToGuess[letter]
            buttonData = fillButtonByIndexesWithMissing(buttonData, arrayOfIndexesInString, letter)
          })

          // set buttonData
        }
        return {
          ...state,
          numberOfIncorrectGuesses,
          missedLetters: shouldAddMissedLetter ? newMissedLetters : state.missedLetters,
          gameInProgress: !shouldGameEnd,
          buttonData
        }
      } else {
        const remaindingLettersToGuess = omit(state.lettersToGuess, guessedLetter)
        const numberOfRemainingLettersToguess = Object.keys(remaindingLettersToGuess).length

        return {
          ...state,
          buttonData: fillButtonByIndexesWithActive(state.buttonData, correctGuess, guessedLetter),
          lettersToGuess: remaindingLettersToGuess,
          gameInProgress: numberOfRemainingLettersToguess > 0
        }
      }
    }
    case GAME_PROGRESS:
      return {
        ...state,
        gameInProgress: action.payload.status
      }
    default:
      return state
  }
}

export default reducer
