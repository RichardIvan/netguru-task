/* @flow */
'use strict'

import m from 'mithril'

import styles from './controls-styles.sass'

export function getSingleStoneSize (dom) {
  // 5 is the margin bettween stones
  return dom.getBoundingClientRect().width / 11 - 5
}

export function createButton (elSize = 75, data) {
  return m(`li.${styles['stone']}`,
    m(`button.${styles.letter}.${data['class']}`, {
      style: {
        height: `${elSize}px`,
        width: `${elSize}px`
      }
    }, m('span', data.letter)))
}

const controlsComponent = {
  view (parentVnode) {
    return m('.controls', m('ul', {
      oncreate (vnode) {
        window.onresize = (e) => {
          parentVnode.state.elementWidth = getSingleStoneSize(vnode.dom)
          m.redraw()
        }
        parentVnode.state.elementWidth = getSingleStoneSize(vnode.dom)
        m.redraw()
      }
    },
      [
        parentVnode.attrs.buttonData.map((item, index) => {
          return createButton(parentVnode.state.elementWidth, item)
        })
      ]))
  }
}

export default controlsComponent
