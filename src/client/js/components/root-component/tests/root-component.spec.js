/* @flow */
'use strict'

import test from 'ava'
import mq from 'mithril-query'

import rootComponent from '../'
import rootReducer from '../../../reducers/'

// console.log('root reducer')
// console.log(rootReducer())

test('root component renders game-card element', t => {
  t.is(mq(rootComponent, { state: rootReducer() }).has('#game-card'), true)
})
