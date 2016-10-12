/* @flow */
'use strict'

import {
  submitGuess
} from '../../actions/game.js'

export function setupKeyBoardControls (store) {
  const dispatch = store.dispatch

  window.addEventListener('keyup', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key
      dispatch(submitGuess(letter))
    }

    // TODO: possiblly show notification if the key pressed is not a letter
  })
}
