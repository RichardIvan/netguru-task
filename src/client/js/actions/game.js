/* @flow */
'use strict'

import { NEW_WORD } from './constants'

export function newWordResponse (word) {
  return {
    type: NEW_WORD,
    payload: {
      word
    }
  }
}
