/* @flow */
'use strict'

import m from 'mithril'

import gameOverComponent from '../components/game-over'

import { newGame } from '../helprs/game'

import {
  getGameProgress
} from '../selectors/game-info/'

const gameOverContainer = {
  view (vnode) {
    return m(gameOverComponent, {
      overlayAttrs: {
        class: getGameProgress(vnode.attrs.state) ? '' : 'active'
      },
      buttonAttrs: {
        onclick: () => newGame(vnode.attrs.dispatch)
      }
    })
  }
}

export default gameOverContainer
