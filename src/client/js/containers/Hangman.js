/* @flow */
'use strict'

import m from 'mithril'

import hangmanComponent from '../components/hangman/index.js'

const hangmanContainer = {
  view () {
    return m(hangmanComponent, {
      bunch: 'of stones'
    })
  }
}

export default hangmanContainer
