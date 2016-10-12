/* @flow */
'use strict'

import m from 'mithril'

import styles from './controls-styles.sass'

export function createButton (data) {
  return m(`li.${styles['stone']}`, m(`button.${styles.letter}.${data['class']}`, data.letter))
}

const controlsComponent = {
  view (vnode) {
    return m('.controls', m('ul', [
      vnode.attrs.buttonData.map(createButton)
    ]))
  }
}

export default controlsComponent
