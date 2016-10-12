/* @flow */
'use strict'

import m from 'mithril'

import gameOverComponent from '../components/game-over'

import { newGame } from '../helprs/game'

import {
  getGameProgress
} from '../selectors/game-info/'

import {
  gameInProgress
} from '../actions/game'

const gameOverContainer = {
  view (vnode) {
    return m(gameOverComponent, {
      overlayAttrs: {
        class: getGameProgress(vnode.attrs.state) ? 'inactive' : 'active'
      },
      buttonAttrs: {
        onclick: () => {
          newGame(vnode.attrs.dispatch)
          vnode.attrs.dispatch(gameInProgress(true))
        }
      }
    })
  }
}

export default gameOverContainer
