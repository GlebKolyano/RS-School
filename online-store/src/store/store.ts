import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bicycleReducer from './reducers/bicycle.slice';

export const rootReducer = combineReducers({ bicycleReducer });

export function setupStore() {
  return configureStore({
    reducer: rootReducer
  });
}
