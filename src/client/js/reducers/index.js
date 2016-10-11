/* @flow */
'use strict'

import { combineReducers } from 'redux'

import buttons from './buttons'
import gameInfo from './game-info/'
// import user from './user'
// import settings from './settings'
// import currentGame from './current-game'
// import highscores from './highscores'

const root = combineReducers({
  buttons,
  gameInfo
  // componentsState,
  // user,
  // settings,
  // currentGame,
  // highscores
})

export default root
