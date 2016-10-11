/* @flow */
'use strict'

import m from 'mithril'

import gameInfoComponent from '../components/game-info'

import { getMissedLetters } from '../selectors/game-info'

const gameInfoContainer = {
  view (vnode) {
    return m(gameInfoComponent, {
      missedLetters: getMissedLetters(vnode.attrs.state)
    })
  }
}

export default gameInfoContainer
