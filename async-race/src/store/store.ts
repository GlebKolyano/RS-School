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
import raceReducer from './slices/race/slice';
import carsPaginationReducer from './slices/pagination/carsPagination/slice';
import winnersPaginationReducer from './slices/pagination/winnersPagination/slice';

const persistConfig = {
  key: '_root',
  storage: storageSession,
  whitelist: []
};

const carsPersistConfig = {
  key: '_cars',
  storage: storageSession,
  whitelist: ['selectedCar']
};

const winnersPaginationPersistConfig = {
  key: '_winners-pagination',
  storage: storageSession,
  whitelist: ['currentPageWinnersPagintion']
};

const carsPaginationPersistConfig = {
  key: '_cars-pagination',
  storage: storageSession,
  whitelist: ['currentPageCarsPagintion']
};

export const rootReducer = combineReducers({
  carsReducer: persistReducer(carsPersistConfig, carsReducer),
  carsPaginationReducer: persistReducer(carsPaginationPersistConfig, carsPaginationReducer),
  winnersPaginationReducer: persistReducer(
    winnersPaginationPersistConfig,
    winnersPaginationReducer
  ),
  winnersReducer,
  engineReducer,
  raceReducer
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
