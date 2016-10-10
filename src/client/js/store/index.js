import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'
// import { rootSaga } from '../sagas'

// import createSagaMiddleware from 'redux-saga'

import m from 'mithril'

// const sagaMiddleware = createSagaMiddleware()

const middleware = [
  // sagaMiddleware,
  // thunkMiddleware,
  createLogger()
]

const enhancer = applyMiddleware(...middleware)

export function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer)
  // sagaMiddleware.run(rootSaga)
  store.subscribe(m.redraw)

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     store.replaceReducer(require('../reducers').default);
  //   });
  // }

  return store
}
