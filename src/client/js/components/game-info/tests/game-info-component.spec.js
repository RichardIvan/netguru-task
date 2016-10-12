/* @flow */
'use strict'

import test from 'ava'

import mq from 'mithril-query'

import gameInfoComponent from '../'

test.beforeEach(t => {
  t.context.out = mq(gameInfoComponent, {
    missedLetters: ['a', 'b', 'c']
  })
})

test('component has correct container', t => {
  const $out = t.context.out

  t.is($out.has('.game-info-container'), true)
})

test('component renders heading correctly', t => {
  const $out = t.context.out

  t.is($out.has('h3'), true)
  t.is($out.contains('You missed:'), true)
})

test('component renders missed letters correctly', t => {
  const $out = t.context.out

  t.is($out.has('ul'), true)
  t.notThrows($out.should.have.at.least.bind(null, 3, 'li'))

  t.is($out.contains('a'), true)
  t.is($out.contains('b'), true)
  t.is($out.contains('c'), true)
})
