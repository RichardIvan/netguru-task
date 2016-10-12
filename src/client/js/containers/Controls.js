/* @flow */
'use strict'

import m from 'mithril'

import controlsComponent from '../components/controls'

import { getButtonsData } from '../selectors/controls/'

const controlsContainer = {
  view (vnode) {
    return m(controlsComponent, {
      ...vnode.attrs,
      buttonData: getButtonsData(vnode.attrs.state)
    })
  }
}

export default controlsContainer
