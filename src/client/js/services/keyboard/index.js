/* @flow */
'use strict'

import {
  submitGuess
} from '../../actions/game.js'

import {
  getGameProgress as isGameInProgress
} from '../../selectors/game-info/'

export function setupKeyBoardControls (store) {
  const dispatch = store.dispatch
  const state = store.getState()

  window.addEventListener('keyup', (e) => {
    if (isGameInProgress(state) && e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key
      dispatch(submitGuess(letter))
    }

    // TODO: possiblly show notification if the key pressed is not a letter
  })
}
