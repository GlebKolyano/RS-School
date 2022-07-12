import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bicycleReducer } from './reducers/bicycle.slice';
import { searchReducer } from './reducers/search.slice';
import { sortReducer } from './reducers/sort.slice';

export const rootReducer = combineReducers({ bicycleReducer, searchReducer, sortReducer });

export function setupStore() {
  return configureStore({
    reducer: rootReducer
  });
}
