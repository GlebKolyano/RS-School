import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchSlice } from './model';

const initialState: ISearchSlice = {
  searchValue: ''
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      const stateVar = state;
      stateVar.searchValue = action.payload;
    }
  }
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
