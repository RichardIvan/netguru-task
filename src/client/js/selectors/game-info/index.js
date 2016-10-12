/* @flow */
'use strict'

export function getMissedLetters (state) {
  return state.gameInfo.missedLetters
}

export function getGameProgress (state) {
  return state.gameInfo.gameInProgress
}

export function getNumberOfGuesses (state) {
  return state.gameInfo.numberOfIncorrectGuesses
}
