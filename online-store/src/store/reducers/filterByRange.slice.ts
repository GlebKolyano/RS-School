import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import LocaleStorage from '../../global/helpers/LocalStorage';
import { FilterByRangePayload, IFilterByRangeInitialState } from '../../global/models';
import { defaultValuePrice, defaultValueQuantity } from '../constants';

const initialState: IFilterByRangeInitialState = {
  filterByQuantity: defaultValueQuantity,
  filterByPrice: defaultValuePrice
};

const filterByRangeSlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    setfilterByQuantity: (state, { payload }: PayloadAction<FilterByRangePayload>) => {
      const { filterByQuantity } = state;
      const { max, min } = payload;
      filterByQuantity.min = min;
      filterByQuantity.max = max;
      LocaleStorage.set('filterByRangeSettings', state);
    },
    setfilterByPrice: (state, { payload }: PayloadAction<FilterByRangePayload>) => {
      const { filterByPrice } = state;
      const { max, min } = payload;
      filterByPrice.min = min;
      filterByPrice.max = max;
      LocaleStorage.set('filterByRangeSettings', state);
    },
    updateStateFiltersByRange: (state) => {
      const stateVar = state;
      stateVar.filterByPrice = defaultValuePrice;
      stateVar.filterByQuantity = defaultValueQuantity;
      LocaleStorage.set('filterByRangeSettings', stateVar);
    }
  }
});

export const { setfilterByQuantity, setfilterByPrice, updateStateFiltersByRange } =
  filterByRangeSlice.actions;
export const filterByRangeReducer = filterByRangeSlice.reducer;
