/* @flow */
'use strict'

import { combineReducers } from 'redux'

import gameInfo from './game-info/'

const root = combineReducers({
  gameInfo
})

export default root
