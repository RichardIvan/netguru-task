/* @flow */
'use strict'

import m from 'mithril'

import controlsComponent from '../components/controls'

import { getButtonsData } from '../selectors/controls/'

// has a minimum and maximum stone that is selectable

// has 11 stones

// has number of stones visible/filled according to the letters in the word

// rest is inactive


// modes for stone will hold the type of the animation
// since we'd like to have delayed animations ??

// container is passing array of configuration items to the Component
// it includes current class
// current letter

// there is logic to set the current letter after the stone
// dispatches prev or next letter upon clicking a button

// we might be triggering animation class within the Component
// and timing out a normal state after the animation finishes

const controlsContainer = {
  view (vnode) {
    return m(controlsComponent, {
      ...vnode.attrs,
      buttonData: getButtonsData(vnode.attrs.state)
    })
  }
}

export default controlsContainer
