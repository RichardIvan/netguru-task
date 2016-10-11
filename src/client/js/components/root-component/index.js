/* @flow */
'use strict'

import m from 'mithril'

import styles from './root-component.sass'

import hangmanContainer from '../../containers/Hangman.js'
import gameInfoContainer from '../../containers/GameInfo'
import controlsContainer from '../../containers/Controls'
import gameOverContainer from '../../containers/GameOver'

const rootComponent = {
  view (vnode) {
    return m(`.${styles.container}`, [
      m(`#game-card.${styles['game-card']}`, [
        m(`.${styles['display-container']}`, [
          m(`.${styles['hangman']}`, [
            // container width 405px
            m(hangmanContainer, { ...vnode.attrs })
          ]),
          m(`.${styles['game-info']}`, [
            // you missed container
            m(gameInfoContainer, { ...vnode.attrs })
          ])
        ]),
        m(`.${styles['controls-container']}`, [
          m(controlsContainer, { ...vnode.attrs })
        ]),
        m(gameOverContainer, { ...vnode.attrs })
      ])
    ])
  }
}

export default rootComponent
