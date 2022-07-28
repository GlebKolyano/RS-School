import { combineReducers, configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/cars/slice';

export const rootReducer = combineReducers({ carsReducer });

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {}
  });
}
