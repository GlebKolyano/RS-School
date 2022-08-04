import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentPageCarsPagintion: 1,
  isDisabledPaginationCarsBtns: false
};

export const carsPagination = createSlice({
  name: 'carsPagination',
  initialState,
  reducers: {
    changeCarsPaginationPage: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.currentPageCarsPagintion = payload;
    },
    disablePaginationCarsBtns: (state) => {
      const stateVar = state;
      stateVar.isDisabledPaginationCarsBtns = true;
    },
    undisablePaginationCarsBtns: (state) => {
      const stateVar = state;
      stateVar.isDisabledPaginationCarsBtns = false;
    }
  }
});

export const { changeCarsPaginationPage, disablePaginationCarsBtns, undisablePaginationCarsBtns } =
  carsPagination.actions;
export default carsPagination.reducer;
