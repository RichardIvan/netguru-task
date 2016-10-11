/* @flow */
'use strict'

import m from 'mithril'

import '../../sass/main.sass'

import rootComponent from '../components/root-component'

const RootContainer = {
  view (vnode) {
    return m(rootComponent, { ...vnode.attrs })
  }
}

export default RootContainer
