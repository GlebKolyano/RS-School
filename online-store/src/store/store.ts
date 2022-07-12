import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bicycleReducer from './reducers/bicycle.slice';
import searchReducer from './reducers/search.slice';

export const rootReducer = combineReducers({ bicycleReducer, searchReducer });

export function setupStore() {
  return configureStore({
    reducer: rootReducer
  });
}
