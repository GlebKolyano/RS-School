import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import carsReducer from './slices/cars/slice';
import winnersReducer from './slices/winnners/slice';
import engineReducer from './slices/engine/slice';
import carsPaginationReducer from './slices/pagination/carsPagination/slice';
import winnersPaginationReducer from './slices/pagination/winnersPagination/slice';

const persistConfig = {
  key: '_async-race',
  storage: storageSession
};

export const rootReducer = combineReducers({
  carsReducer,
  carsPaginationReducer,
  winnersPaginationReducer,
  winnersReducer,
  engineReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function setupStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  });
}

export const store = setupStore();
export const persistor = persistStore(store);
