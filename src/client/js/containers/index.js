import m from 'mithril'

import { configureStore } from '../store'
import { newGame as startGame } from '../helpers/game/'
// import { startResponsiveStateService } from '../services/mobile-state'

import {
  attachStoreToComponent
} from '../helpers/application'

// import {
//   setupKeyBoardControls
// } from '../services'

// import '../../css/global-styles.css'
// import '../../css/initial-load-styles.scss'

import Root from './Root'

const store = configureStore()
startGame(store.dispatch)

// startResponsiveStateService(store)
// setupKeyBoardControls(store)

export function mountRoot (el) {
  const mount = (Component) => m.mount(el, attachStoreToComponent(Component, store))
  mount(Root)
}
