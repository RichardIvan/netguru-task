/* @flow */
'use strict'

import test from 'ava'

import sinon from 'sinon'

import {
  fillButton,
  newGame
} from '../'

test('fillButton is correct', t => {
  const $out = fillButton('active')
  const $out2 = fillButton('active')

  const $expected = {
    class: 'active',
    letter: 'a'
  }
  const $expected2 = {
    class: '',
    letter: ''
  }

  t.deepEqual($out('a'), $expected)
  t.deepEqual($out2(), $expected2)
})

let requests

test.beforeEach(t => {
  window.XMLHttpRequest = sinon.useFakeXMLHttpRequest()
  requests = []
  window.XMLHttpRequest.onCreate = function (req) { requests.push(req) }
})

test('newGame is correct', async t => {
  t.plan(1)

  const dispatch = sinon.spy()
  newGame(dispatch)

  const value = () => Promise.resolve().then(() => {
    requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ word: 'sofake' })
    )
  }).then(() => {
    return dispatch.firstCall.args[0].payload.word
    // t.is(dispatch.firstCall.args[0].payload.word, 'sofake')
  })

  t.is(await value(), 'sofake')
})

test.afterEach(t => {
  window.XMLHttpRequest.restore()
})
