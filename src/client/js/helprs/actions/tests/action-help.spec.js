/* @flow */
'use strict'

import test from 'ava'

import {
  fillButtons
} from '../'

test('returns object with correct keys', t => {
  const word = 'word'
  const wordArr = word.split('')
  const indexes = [1, 2, 3]

  const $out = Object.keys(fillButtons(wordArr, indexes))
  const $expected = ['buttonData', 'lettersToGuess']
  t.deepEqual($out, $expected)
})

test('returns correctly filled buttonData', t => {
  const word = 'word'
  const wordArr = word.split('')
  const indexes = [0, 1, 2]

  const $out = fillButtons(wordArr, indexes).buttonData
  const $expected = [
    {
      class: '',
      letter: ''
    },
    {
      class: '',
      letter: ''
    },
    {
      class: '',
      letter: ''
    },
    {
      class: '',
      letter: ''
    },
    {
      class: '',
      letter: ''
    },
    {
      class: '',
      letter: ''
    },
    {
      class: '',
      letter: ''
    },
    {
      class: 'active',
      letter: 'w'
    },
    {
      class: 'active',
      letter: 'o'
    },
    {
      class: 'active',
      letter: 'r'
    },
    {
      class: 'active',
      letter: ''
    }
  ]
  t.deepEqual($out, $expected)
})

test('returns correctly filled lettersToGuess', t => {
  const word = 'word'
  const wordArr = word.split('')
  const indexes = [0, 1, 2]

  const $out = fillButtons(wordArr, indexes).lettersToGuess
  const $expected = {
    d: [10]
  }
  t.deepEqual($out, $expected)
})
