/* @flow */
'use strict'

import test from 'ava'

import sinon from 'sinon'

import {
  fillButton,
  newGame
} from '../'

test('fillButton is correct', t => {
  const $out = fillButton('a')
  const $out2 = fillButton()

  const $expected = {
    class: 'active',
    letter: 'a'
  }
  const $expected2 = {
    class: '',
    letter: ''
  }

  t.deepEqual($out, $expected)
  t.deepEqual($out2, $expected2)
})

let requests

test.beforeEach(t => {
  window.XMLHttpRequest = sinon.useFakeXMLHttpRequest()
  requests = []
  window.XMLHttpRequest.onCreate = function (req) { requests.push(req) }
})

test('newGame is correct', t => {
  t.plan(1)

  const dispatch = sinon.spy()
  newGame(dispatch)

  return Promise.resolve().then(() => {
    requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ word: 'sofake' })
    )
  }).then(() => {
    t.is(dispatch.firstCall.args[0].payload.word, 'sofake')
  })
})

test.afterEach(t => {
  window.XMLHttpRequest.restore()
})
