import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMinMaxValues } from '../../helpers/helpers';
import LocaleStorage from '../../helpers/LocaleStorage';
import { FilterByRangePayload, IFilterByRangeSlice } from '../../models/models';
import { getFiltersByRangeFromStore } from './helpers';

const Storage = new LocaleStorage();
const { storeRangePrice, storeRangeQuantity } = getFiltersByRangeFromStore();
const minMaxValues = getMinMaxValues();
const { maxPrice, minPrice, maxQuantity, minQuantity } = minMaxValues;

const initialState: IFilterByRangeSlice = {
  filterByQuantity: storeRangeQuantity || { min: minQuantity, max: maxQuantity },
  filterByPrice: storeRangePrice || { min: minPrice, max: maxPrice }
};

const filterByRangeSlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    setfilterByQuantity: (state, action: PayloadAction<FilterByRangePayload>) => {
      const stateVar = state;
      const { filterByQuantity } = stateVar;
      filterByQuantity.min = action.payload.min;
      filterByQuantity.max = action.payload.max;
      Storage.set('filterByRangeSettings', stateVar);
    },
    setfilterByPrice: (state, action: PayloadAction<FilterByRangePayload>) => {
      const stateVar = state;
      const { filterByPrice } = stateVar;
      filterByPrice.min = action.payload.min;
      filterByPrice.max = action.payload.max;
      Storage.set('filterByRangeSettings', stateVar);
    }
  }
});

export const { setfilterByQuantity, setfilterByPrice } = filterByRangeSlice.actions;
export const filterByRangeReducer = filterByRangeSlice.reducer;
