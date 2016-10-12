/* @flow */
'use strict'

import test from 'ava'

import {
  getMissedLetters,
  getGameProgress
} from '../'

test('getMissedLetters gets correct array of letters', t => {
  const initialState = {
    gameInfo: {
      missedLetters: []
    }
  }
  t.deepEqual(getMissedLetters(initialState), [])

  const state = {
    gameInfo: {
      missedLetters: ['a', 'b', 'c']
    }
  }
  t.deepEqual(getMissedLetters(state), ['a', 'b', 'c'])
})

test('getGameProgress gets the correct progress', t => {
  const state = {
    gameInfo: {
      gameInProgress: true
    }
  }
  t.is(getGameProgress(state), true)
  const newState = {
    gameInfo: {
      gameInProgress: false
    }
  }
  t.is(getGameProgress(newState), false)
})
