import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentPageCarsPagintion: 1
};

export const carsPagination = createSlice({
  name: 'carsPagination',
  initialState,
  reducers: {
    changeCarsPaginationPage: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.currentPageCarsPagintion = payload;
    }
  }
});

export const { changeCarsPaginationPage } = carsPagination.actions;
export default carsPagination.reducer;
