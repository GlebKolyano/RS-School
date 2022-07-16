import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocaleStorage from '../../global/helpers/LocalStorage';
import { ISortInitialState } from '../../models/models';

const Storage = new LocaleStorage();

const initialState: ISortInitialState = {
  sortOption: 'name_asc'
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      const stateVar = state;
      stateVar.sortOption = action.payload;
      Storage.set('sortSettings', action.payload);
    }
  }
});

export const { setSort } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
