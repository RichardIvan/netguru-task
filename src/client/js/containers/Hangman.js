/* @flow */
'use strict'

import m from 'mithril'

import hangmanComponent from '../components/hangman/index.js'

const hangmanContainer = {
  view (vnode) {
    return m(hangmanComponent, { ...vnode.attrs })
  }
}

export default hangmanContainer
