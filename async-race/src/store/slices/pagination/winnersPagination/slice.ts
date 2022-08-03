import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentPageWinnersPagintion: 1
};

export const winnersPagination = createSlice({
  name: 'winnersPagination',
  initialState,
  reducers: {
    changeWinnersPaginationPage: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.currentPageWinnersPagintion = payload;
    }
  }
});

export const { changeWinnersPaginationPage } = winnersPagination.actions;
export default winnersPagination.reducer;
