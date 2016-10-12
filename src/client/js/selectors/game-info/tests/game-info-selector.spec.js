/* @flow */
'use strict'

import test from 'ava'

import {
  getMissedLetters,
  getGameProgress
} from '../'

test('getMissedLetters gets correct array of letters', t => {
  const initialState = {
    buttons: {
      missedLetters: []
    }
  }
  t.deepEqual(getMissedLetters(initialState), [])

  const state = {
    buttons: {
      missedLetters: ['a', 'b', 'c']
    }
  }
  t.deepEqual(getMissedLetters(state), ['a', 'b', 'c'])
})

test('getGameProgress gets the correct progress', t => {
  const state = {
    buttons: {
      gameInProgress: true
    }
  }
  t.is(getGameProgress(state), true)
  const newState = {
    buttons: {
      gameInProgress: false
    }
  }
  t.is(getGameProgress(newState), false)
})
