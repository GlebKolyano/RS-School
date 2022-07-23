import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bicycleReducer } from './slices/bicycle/slice';
import { searchReducer } from './slices/filterBySearch/slice';
import { sortReducer } from './slices/sort/slice';
import { filterByValueReducer } from './slices/filterByValue/slice';
import { filterByRangeReducer } from './slices/filterByRange/slice';
import { cartReducer } from './slices/cart/slice';
import { modalReducer } from './slices/modal/slice';
import { IStoreInitialState } from '../global/models';

export const rootReducer = combineReducers({
  bicycleReducer,
  searchReducer,
  sortReducer,
  filterByValueReducer,
  filterByRangeReducer,
  cartReducer,
  modalReducer
});

export function setupStore({
  bicycle,
  cart,
  filterByRange,
  filterByValue,
  modal,
  search,
  sort
}: IStoreInitialState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      filterByRangeReducer: filterByRange,
      filterByValueReducer: filterByValue,
      bicycleReducer: bicycle,
      modalReducer: modal,
      sortReducer: sort,
      searchReducer: search,
      cartReducer: cart
    }
  });
}
