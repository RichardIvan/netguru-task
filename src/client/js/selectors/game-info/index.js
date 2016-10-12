/* @flow */
'use strict'

export function getMissedLetters(state) {
  return state.buttons.missedLetters
}

export function getGameProgress(state) {
  return state.buttons.gameInProgress
}

export function getNumberOfGuesses(state) {
  return state.buttons.numberOfIncorrectGuesses
}
