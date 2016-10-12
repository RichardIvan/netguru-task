/* @flow */
'use strict'

import m from 'mithril'

import styles from './controls-styles.sass'

export function createButton (elSize = 75, data) {
  console.log(elSize, data)
  return m(`li.${styles['stone']}`,
    m(`button.${styles.letter}.${data['class']}`, {
      style: {
        height: `${elSize}px`,
        width: `${elSize}px`
      }
    }, data.letter))
}

const controlsComponent = {
  view (pVnode) {
    return m('.controls', m('ul', {
        oncreate (vnode) {
          window.onresize = (e) => {
            pVnode.state.elementWidth = vnode.dom.getBoundingClientRect().width / 11 - 5
            m.redraw()
          }
          pVnode.state.elementWidth = vnode.dom.getBoundingClientRect().width / 11 - 5
          m.redraw()
        },
        onbeforeupdate (vnode) {
          console.log(vnode.state.elementWidth)
        }
      }, [
        pVnode.attrs.buttonData.map((item) => {
          return createButton(pVnode.state.elementWidth, item)
        })
      ]))
  }
}

export default controlsComponent
