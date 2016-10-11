/* @flow */
'use strict'

import test from 'ava'

import reducer from '../'

import {
  NEW_WORD
} from '../../../actions/constants/'

import initialState from '../../../reducers/game-info/'

test('initial state has gameInProgress set as true', t => {
  t.is(reducer().gameInProgress, true)
})

test('the NEW_WORD action type sets gameInProgress to true', t => {
  const action = {
    type: NEW_WORD
  }
  const state = {
    ...initialState(),
    gameInProgress: false
  }
  t.is(reducer(state, action).gameInProgress, true)
})
