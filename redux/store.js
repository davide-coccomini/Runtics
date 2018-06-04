import {applyMiddleware, createStore,compose} from "redux";
import reducers from "./reducers";
import {createLogger} from 'redux-logger';
import sagas from './sagas';
import createSagaMiddleware from 'redux-saga';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native'

const rehydrationPromise = new Promise((resolve, reject) => {
    rehydrationComplete = resolve
    rehydrationFailed = reject
  })
  
  export function rehydration () {
    return rehydrationPromise
  }
  


const sagaMiddleware = createSagaMiddleware()

const logger = createLogger();
const middlewares = applyMiddleware(sagaMiddleware,logger);

const store = createStore(reducers, compose(middlewares,autoRehydrate()));

export default store;

persistStore(store, {storage: AsyncStorage})
sagaMiddleware.run(sagas);

