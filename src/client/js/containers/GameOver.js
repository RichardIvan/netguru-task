/* @flow */
'use strict'

import m from 'mithril'

import gameOverComponent from '../components/game-over'

import { newGame } from '../helpers/game'

const gameOverContainer = {
  view (vnode) {
    return m(gameOverComponent, {
      buttonAttrs: {
        onclick: () => newGame(vnode.attrs.dispatch)
      }
    })
  }
}

export default gameOverContainer
