/* @flow */
'use strict'

import m from 'mithril'

import '../../sass/main.sass'

// import rootComponent

const RootContainer = {
  view (vnode) {
    console.log(vnode)
    return m('', `yes hi`)
  }
}

export default RootContainer
