import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISortSlice } from './model';

const initialState: ISortSlice = {
  sortOption: 'name_asc'
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      const stateVar = state;
      stateVar.sortOption = action.payload;
    }
  }
});

export const { setSort } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
