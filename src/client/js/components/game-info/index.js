/* @flow */
'use strict'

import m from 'mithril'

import styles from './game-info-styles.sass'

export function createMissedLetter (letter) {
  return m('li', m(`span.${styles.letter}`, letter))
}

const gameInfoComponent = {
  view (vnode) {
    return m('.game-info-container', [
      m('h3', 'You missed:'),
      m('ul', [
        vnode.attrs.missedLetters.map(createMissedLetter)
      ])
    ])
  }
}

export default gameInfoComponent
