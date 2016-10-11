/* @flow */
'use strict'

import m from 'mithril'

import styles from './game-over-styles.sass'

const gameOverComponent = {
  view (vnode) {
    return m('.game-over-container', [
      m('h1', 'Game Over'),
      m('button', vnode.attrs.buttonAttrs, 'New Word')
    ])
  }
}

export default gameOverComponent
