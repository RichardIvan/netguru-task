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
  view (parentVnode) {
    return m('.controls', m('ul', {
        oncreate (vnode) {
          window.onresize = (e) => {
            parentVnode.state.elementWidth = vnode.dom.getBoundingClientRect().width / 11 - 5
            m.redraw()
          }
          parentVnode.state.elementWidth = vnode.dom.getBoundingClientRect().width / 11 - 5
          m.redraw()
        }
      }, [
        parentVnode.attrs.buttonData.map((item) => {
          return createButton(parentVnode.state.elementWidth, item)
        })
      ]))
  }
}

export default controlsComponent
