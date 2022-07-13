import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocaleStorage from '../../helpers/LocaleStorage';
import { ISearchSlice } from '../../models/models';
import { getSearchFilterFromStore } from './getFiltersFromStore';

const Storage = new LocaleStorage();
const searchStore = getSearchFilterFromStore();

const initialState: ISearchSlice = {
  searchValue: searchStore || ''
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      const stateVar = state;
      stateVar.searchValue = action.payload;
      Storage.set('filterBySearchSettings', action.payload);
    }
  }
});

export const { setSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
