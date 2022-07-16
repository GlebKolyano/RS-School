import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import LocaleStorage from '../../global/helpers/LocalStorage';
import { FilterByRangePayload, IFilterByRangeInitialState } from '../../models/models';
import { defaultValuePrice, defaultValueQuantity } from '../constants';

const Storage = new LocaleStorage();

const initialState: IFilterByRangeInitialState = {
  filterByQuantity: defaultValueQuantity,
  filterByPrice: defaultValuePrice
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
    },
    updateStateFiltersByRange: (state) => {
      const stateVar = state;
      stateVar.filterByPrice = defaultValuePrice;
      stateVar.filterByQuantity = defaultValueQuantity;
      Storage.set('filterByRangeSettings', stateVar);
    }
  }
});

export const { setfilterByQuantity, setfilterByPrice, updateStateFiltersByRange } =
  filterByRangeSlice.actions;
export const filterByRangeReducer = filterByRangeSlice.reducer;
