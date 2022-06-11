import {createStore, applyMiddleware} from 'redux';
import {allReducers} from './allReducers';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import thunk from 'redux-thunk';

const allMiddlewares = applyMiddleware(thunk);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeOut: null,
  whitelist: ['global'],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(persistedReducer, {}, allMiddlewares);
export const persistor = persistStore(store);
