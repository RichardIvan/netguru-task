/* @flow */
'use strict'

import {
  submitGuess,
  gameInProgress
} from '../../actions/game.js'

import { newGame } from '../../helprs/game'

import {
  getGameProgress as isGameInProgress
} from '../../selectors/game-info/'

export function setupKeyBoardControls (store) {
  const dispatch = store.dispatch

  window.addEventListener('keyup', (e) => {
    const state = store.getState()
    const inProgress = isGameInProgress(state)

    if (inProgress && e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key
      dispatch(submitGuess(letter))
    }

    if (!inProgress && e.keyCode === 13) {
      dispatch(gameInProgress(true))
      newGame(dispatch)
    }

    // TODO: possiblly show notification if the key pressed is not a letter
  })
}
