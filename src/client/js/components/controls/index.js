/* @flow */
'use strict'

import m from 'mithril'

import styles from './controls-styles.sass'

export function createButton (data) {
  return m(`li.${styles['button']}.${data['class']}`, m(`.${styles.letter}`, data.letter))
}

const controlsComponent = {
  view (vnode) {
    return m('.controls', m('ul', [
      vnode.attrs.buttonData.map(createButton)
    ]))
  }
}

export default controlsComponent
