import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMinMaxValues } from '../../helpers/helpers';
import { FilterByRangePayload, IFilterByRangeSlice } from '../../models/models';

const minMaxValues = getMinMaxValues();
const { maxPrice, minPrice, maxQuantity, minQuantity } = minMaxValues;

const initialState: IFilterByRangeSlice = {
  filterByQuantity: { min: minQuantity, max: maxQuantity },
  filterByPrice: { min: minPrice, max: maxPrice }
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
    },
    setfilterByPrice: (state, action: PayloadAction<FilterByRangePayload>) => {
      const stateVar = state;
      const { filterByPrice } = stateVar;
      filterByPrice.min = action.payload.min;
      filterByPrice.max = action.payload.max;
    }
  }
});

export const { setfilterByQuantity, setfilterByPrice } = filterByRangeSlice.actions;
export const filterByRangeReducer = filterByRangeSlice.reducer;
