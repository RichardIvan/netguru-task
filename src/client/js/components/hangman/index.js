/* @flow */
'use strict'

import m from 'mithril'

import styles from './hangman-styles.sass'

import head from '../../../imgs/head.png'
import bar from '../../../imgs/bar.png'
import neck from '../../../imgs/neck.png'
import corpus from '../../../imgs/corpus.png'
import leftArm from '../../../imgs/left-arm.png'
import leftHand from '../../../imgs/left-hand.png'
import rightArm from '../../../imgs/right-arm.png'
import rightHand from '../../../imgs/right-hand.png'
import leftLeg from '../../../imgs/left-leg.png'
import leftFoot from '../../../imgs/left-foot.png'
import rightLeg from '../../../imgs/right-leg.png'

import {
  getNumberOfGuesses
} from '../../selectors/game-info/'

const hangmanComponent = {
  oninit (vnode) {
    vnode.state.numberOfGuesses = getNumberOfGuesses(vnode.attrs.state)
  },
  onbeforeupdate (vnode) {
    vnode.state.numberOfGuesses = getNumberOfGuesses(vnode.attrs.state)
  },
  view (vnode) {
    return m(`.${styles['hangman-container']}`, [
      m('.left-side', m('.inner', [
        m(`img.${styles.bar}`, {
          src: bar
        }),
        m(`img.${styles.head}`, {
          src: head,
          style: {
            opacity: vnode.state.numberOfGuesses >= 1 ? 1 : 0
          }
        }),
        m(`img.${styles.neck}`, {
          src: neck,
          style: {
            opacity: vnode.state.numberOfGuesses >= 2 ? 1 : 0
          }
        }),
        m(`img.${styles['left-arm']}`, {
          src: leftArm,
          style: {
            opacity: vnode.state.numberOfGuesses >= 5 ? 1 : 0
          }
        }),
        m(`img.${styles['left-hand']}`, {
          src: leftHand,
          style: {
            opacity: vnode.state.numberOfGuesses >= 7 ? 1 : 0
          }
        }),
        m(`img.${styles.corpus}`, {
          src: corpus,
          style: {
            opacity: vnode.state.numberOfGuesses >= 3 ? 1 : 0
          }
        }),
        m(`img.${styles['right-arm']}`, {
          src: rightArm,
          style: {
            opacity: vnode.state.numberOfGuesses >= 4 ? 1 : 0
          }
        }),
        m(`img.${styles['right-hand']}`, {
          src: rightHand,
          style: {
            opacity: vnode.state.numberOfGuesses >= 6 ? 1 : 0
          }
        }),
        m(`img.${styles['left-leg']}`, {
          src: leftLeg,
          style: {
            opacity: vnode.state.numberOfGuesses >= 9 ? 1 : 0
          }
        }),
        m(`img.${styles['left-foot']}`, {
          src: leftFoot,
          style: {
            opacity: vnode.state.numberOfGuesses >= 11 ? 1 : 0
          }
        }),
        m(`img.${styles['right-leg']}`, {
          src: rightLeg,
          style: {
            opacity: vnode.state.numberOfGuesses >= 8 ? 1 : 0
          }
        }),
        m(`img.${styles['right-foot']}`, {
          src: leftFoot,
          style: {
            opacity: vnode.state.numberOfGuesses >= 10 ? 1 : 0
          }
        })
      ])),
      m('.right-side')
    ])
  }
}

export default hangmanComponent
