/* @flow */
'use strict'

import test from 'ava'

import reducer, { initialState } from '../'

import {
  submitGuess
} from '../../../actions/game'

import {
  NEW_WORD
} from '../../../actions/constants/'

import filter from 'lodash/filter'

test('buttons reducer has initial state', t => {
  t.is(reducer().buttonData.length, 11)
  t.is(reducer().word, '')
})

test('reducer sets new word on NEW_WORD actions type', t => {
  const state = initialState
  const action = {
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
        d: [3]
      },
      word: 'word'
    }
  }

  function notEmpty (item) {
    return item.letter !== ''
  }
  t.is(filter(reducer(state, action).buttonData, notEmpty).length, 3)
  t.is(reducer(state, action).word, 'word')
})

test('reducer sets new lettersToGuess on NEW_WORD actions type', t => {
  const state = initialState
  const action = {
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
        ],
        lettersToGuess: {
          d: [3]
        }
      },
      word: 'word'
    }
  }

  const expected = {
    d: [3]
  }
  t.deepEqual(reducer(state, action).lettersToGuess, expected)
})

test('incorrect SUBMIT_GUESS, increases incorect numberOf guesses', t => {
  const action = submitGuess('a')
  const state = {
    numberOfIncorrectGuesses: 0,
    missedLetters: [],
    lettersToGuess: ['c']
  }
  t.is(reducer(state, action).numberOfIncorrectGuesses, 1)
})

test('correct SUBMIT_GUESS, does not increas incorect numberOf guesses', t => {
  const action = submitGuess('c')
  const state = {
    numberOfIncorrectGuesses: 0,
    buttonData: [
      {
        class: '',
        letter: ''
      },
      {
        class: '',
        letter: ''
      }
    ],
    lettersToGuess: {
      'c': [1]
    }
  }
  t.is(reducer(state, action).numberOfIncorrectGuesses, 0)
})

test('correct SUBMIT_GUESS, removes the letter from lettersToGuess', t => {
  const action = submitGuess('c')
  const state = {
    numberOfIncorrectGuesses: 0,
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
      }
    ],
    lettersToGuess: {
      c: [1],
      d: [2]
    }
  }
  t.deepEqual(reducer(state, action).lettersToGuess, {d: [2]})
})

test('correct SUBMIT_GUESS, reveals correct letters in buttonData', t => {
  const action = submitGuess('d')
  const state = {
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
    ],
    lettersToGuess: {
      'd': [10]
    }
  }
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
      letter: 'd'
    }
  ]
  t.deepEqual(reducer(state, action).lettersToGuess, {})
  t.deepEqual(reducer(state, action).buttonData, $expected)
})

test('incorrect SUBMIT_GUESS, adds the letter to missedLetters array', t => {
  const action = submitGuess('a')
  const state = {
    numberOfIncorrectGuesses: 0,
    missedLetters: [],
    lettersToGuess: {
      c: [1],
      d: [2]
    }
  }
  t.deepEqual(reducer(state, action).missedLetters, ['a'])
  // test('it doesnt add duplicates', t => {
  //
  // })
})
