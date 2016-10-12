/* @flow */
'use strict'

import test from 'ava'

import reducer, { initialState } from '../'

import {
  submitGuess,
  gameInProgress
} from '../../../actions/game'

import {
  NEW_WORD
} from '../../../actions/constants/'

import filter from 'lodash/filter'
import last from 'lodash/last'

test('buttons reducer has initial state', t => {
  t.is(reducer().buttonData.length, 11)
  t.is(reducer().word, '')
})

test.beforeEach(t => {
  t.context.action = {
    type: NEW_WORD,
    payload: {
      newWordData: {
        buttonData: [
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
          }
        ]
      },
      lettersToGuess: {
        d: [3],
        o: [7, 8]
      },
      word: 'word'
    }
  }
  t.context.state = {
    buttonData: [
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
        letter: ''
      },
      {
        class: 'active',
        letter: ''
      },
      {
        class: 'active',
        letter: 'd'
      },
      {
        class: 'active',
        letter: ''
      }
    ],
    gameInProgress: true,
    numberOfIncorrectGuesses: 0,
    missedLetters: ['a', 'b'],
    lettersToGuess: {
      'd': [10],
      'o': [7, 8]
    }
  }
})

test('reducer sets new word on NEW_WORD actions type', t => {
  const state = t.context.state
  const action = t.context.action

  function notEmpty (item) {
    return item.letter !== ''
  }

  t.is(filter(reducer(state, action).buttonData, notEmpty).length, 3)
  t.is(reducer(state, action).word, 'word')
})

test('reducer sets new lettersToGuess on NEW_WORD actions type', t => {
  const state = t.context.state
  const action = t.context.actin

  const $out = reducer(state, action)
  const $expected = {
    d: [10],
    o: [7, 8]
  }

  t.deepEqual($out.lettersToGuess, $expected)
})

test('NEW_WORD resets missedLetters array', t => {
  const state = t.context.state
  const action = t.context.action

  const $out = reducer(state, action)
  const $expected = []
  t.deepEqual($out.missedLetters, $expected)
})

test('NEW_WORD sets the gameProgress to true', t => {
  let state = t.context.state
  state.gameProgress = false
  const action = t.context.action

  const $out = reducer(state, action)
  const $expected = true

  t.is($out.gameInProgress, $expected)
})

test('incorrect SUBMIT_GUESS, increases incorect numberOf guesses', t => {
  const action = submitGuess('a')
  const state = t.context.state

  const $out = reducer(state, action)
  const $expected = 1

  t.is($out.numberOfIncorrectGuesses, $expected)
  t.is(reducer($out, submitGuess('k')).numberOfIncorrectGuesses, $expected + 1)
})

test('correct SUBMIT_GUESS, does not increas incorect numberOf guesses', t => {
  const action = submitGuess('d')
  const state = t.context.state

  const $out = reducer(state, action)
  const $expected = 0

  t.is($out.numberOfIncorrectGuesses, $expected)
})

test('correct SUBMIT_GUESS, removes the letter from lettersToGuess', t => {
  const action = submitGuess('d')
  const state = t.context.state

  const $out = reducer(state, action)
  const $expected = {
    o: [7, 8]
  }

  t.deepEqual($out.lettersToGuess, $expected)
})

test('correct SUBMIT_GUESS, reveals correct letters in buttonData', t => {
  const action = submitGuess('d')
  const state = t.context.state

  const $out = reducer(state, action)
  const $expected = {
    class: 'active',
    letter: 'd'
  }

  t.deepEqual($out.lettersToGuess, {
    o: [7, 8]
  })
  t.deepEqual(last($out.buttonData), $expected)

  t.deepEqual(reducer($out, submitGuess('o')).buttonData[7], {
    class: 'active',
    letter: 'o'
  })
  t.deepEqual(reducer($out, submitGuess('o')).buttonData[8], {
    class: 'active',
    letter: 'o'
  })
})

test('incorrect SUBMIT_GUESS, adds the letter to missedLetters array', t => {
  const action = submitGuess('f')
  const state = t.context.state

  const $out = reducer(state, action)
  const $expected = ['a', 'b', 'f']

  t.deepEqual($out.missedLetters, $expected)
})

test('incorrect and final SUBMIT_GUESS sets game progress to false', t => {
  const action = submitGuess('a')
  let state = t.context.state
  state.numberOfIncorrectGuesses = 9

  const $out = reducer(state, action)
  const $expected = 10

  t.is($out.numberOfIncorrectGuesses, $expected)
  t.is($out.gameInProgress, true)
  t.is(reducer($out, submitGuess('a')).numberOfIncorrectGuesses, $expected + 1)
  t.is(reducer($out, submitGuess('a')).gameInProgress, false)
})

test('GAME_PROGRESS sets the correct state', t => {
  const action = gameInProgress(true)
  const action2 = gameInProgress(false)
  let state = t.context.state
  state.gameInProgress = false

  const $out = reducer(state, action)
  const $out2 = reducer($out, action2)
  const $expected = true
  const $expected2 = false

  t.is($out.gameInProgress, $expected)
  t.is($out2.gameInProgress, $expected2)
})
