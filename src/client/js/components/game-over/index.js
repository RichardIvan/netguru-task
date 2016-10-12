/* @flow */
'use strict'

import m from 'mithril'

import './game-over-styles.sass'

const gameOverComponent = {
  view (vnode) {
    return m('.game-over-container', vnode.attrs.overlayAttrs, [
      m('h1', 'Game Over'),
      m('button', vnode.attrs.buttonAttrs, 'New Word')
    ])
  }
}

export default gameOverComponent
