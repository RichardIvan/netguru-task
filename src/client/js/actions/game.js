/* @flow */
'use strict'

import {
  NEW_WORD,
  SUBMIT_GUESS
} from './constants'

import {
  uniqueArray
} from '../helprs/game/'

import {
  fillButtons
} from '../helprs/actions/'

const percentVisible = 0.3

export function newWordResponse (word) {
  const wordArray = word.split('')
  const wordLength = word.length
  const numberOfVisibleWords = Math.ceil(wordLength * percentVisible)
  const visibleWordsIndexes = uniqueArray(0, wordLength - 1, numberOfVisibleWords)

  // holds filled buttons
  // holds letters to guess
  const newWordData = fillButtons(wordArray, visibleWordsIndexes)

  return {
    type: NEW_WORD,
    payload: {
      newWordData,
      word
    }
  }
}

export function submitGuess (letter) {
  return {
    type: SUBMIT_GUESS,
    payload: {
      letter
    }
  }
}
