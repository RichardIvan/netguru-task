/* @flow */
'use strict'

import m from 'mithril'

export function attachStoreToComponent(Component, store) {
  return {
    view: () => m(Component, { state: store.getState(), dispatch: store.dispatch })
  }
}
