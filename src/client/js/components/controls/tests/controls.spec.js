/* @flow */
'use strict'

import test from 'ava'

import mq from 'mithril-query'

import controlsComponent from '../'

import { getButtonsData } from '../../../selectors/controls/'
import { initialState } from '../../../reducers/game-info/'

test('Controls element has 11 items', t => {
  const state = {
    gameInfo: initialState
  }

  const component = mq(controlsComponent, {
    buttonData: getButtonsData(state)
  })
  t.is(component.has('ul'), true)
  t.notThrows(component.should.have.at.least.bind(null, 11, 'li'))
})
