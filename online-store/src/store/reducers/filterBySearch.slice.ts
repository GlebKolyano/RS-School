import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocaleStorage from '../../global/helpers/LocalStorage';
import { ISearchInitialState } from '../../global/models';

const Storage = new LocaleStorage();

const initialState: ISearchInitialState = {
  searchValue: ''
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      const stateVar = state;
      stateVar.searchValue = action.payload;
      Storage.set('filterBySearchSettings', action.payload);
    },
    updateStateFilterBySearch: (state) => {
      const stateVar = state;
      stateVar.searchValue = '';
    }
  }
});

export const { setSearch, updateStateFilterBySearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
