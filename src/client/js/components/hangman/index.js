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
import rightFoot from '../../../imgs/left-foot.png'

const hangmanComponent = {
  view () {
    return m(`.${styles['hangman-container']}`, [
      m('.left-side', m('.inner', [
        m(`img.${styles.bar}`, {
          src: bar
        }),
        m(`img.${styles.head}`, {
          src: head
        }),
        m(`img.${styles.neck}`, {
          src: neck
        }),
        m(`img.${styles['left-arm']}`, {
          src: leftArm
        }),
        m(`img.${styles['left-hand']}`, {
          src: leftHand
        }),
        m(`img.${styles.corpus}`, {
          src: corpus
        }),
        m(`img.${styles['right-arm']}`, {
          src: rightArm
        }),
        m(`img.${styles['right-hand']}`, {
          src: rightHand
        }),
        m(`img.${styles['left-leg']}`, {
          src: leftLeg
        }),
        m(`img.${styles['left-foot']}`, {
          src: leftFoot
        }),
        m(`img.${styles['right-leg']}`, {
          src: rightLeg
        }),
        m(`img.${styles['right-foot']}`, {
          src: rightFoot
        })
      ])),
      m('.right-side')
    ])
  }
}

export default hangmanComponent
