/* @flow */
'use strict'

import test from 'ava'

import isPlainObject from 'lodash/isPlainObject'

import { getButtonsData } from '../'
import { initialState } from '../../../reducers/game-info/'

test('has initial state of eleven items', t => {
  const state = {
    gameInfo: initialState
  }
  const buttons = getButtonsData(state)
  t.is(buttons.length, 11)

  buttons.forEach(button => {
    t.is(isPlainObject(button), true)
    t.deepEqual(Object.keys(button), ['class', 'letter'])
    t.is(button.class, '')
    t.is(button.letter, '')
  })
})
