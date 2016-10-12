/* @flow */
'use strict'

import test from 'ava'

import {
  gameInProgress
} from '../game'

import {
  GAME_PROGRESS
} from '../constants'

test(t => {
  const $out = gameInProgress(true)
  const $out2 = gameInProgress(false)
  
  const $expected = {
    type: GAME_PROGRESS,
    payload: {
      status: true
    }
  }
  const $expected2 = {
    type: GAME_PROGRESS,
    payload: {
      status: false
    }
  }

  t.deepEqual($out, $expected)
  t.deepEqual($out2, $expected2)
})
