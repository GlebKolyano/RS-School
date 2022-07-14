import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bicycleReducer } from './reducers/bicycle.slice';
import { searchReducer } from './reducers/filterBySearch.slice';
import { sortReducer } from './reducers/sort.slice';
import { filterByValueReducer } from './reducers/filterByValue.slice';
import { filterByRangeReducer } from './reducers/filterByRange.slice';
import { cartReducer } from './reducers/cart.slice';
import { modalReducer } from './reducers/modal.slice';

export const rootReducer = combineReducers({
  bicycleReducer,
  searchReducer,
  sortReducer,
  filterByValueReducer,
  filterByRangeReducer,
  cartReducer,
  modalReducer
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer
  });
}
