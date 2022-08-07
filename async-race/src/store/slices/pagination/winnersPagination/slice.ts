import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentPageWinnersPagination: 1
};

export const winnersPagination = createSlice({
  name: 'winnersPagination',
  initialState,
  reducers: {
    changeWinnersPaginationPage: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.currentPageWinnersPagination = payload;
    }
  }
});

export const { changeWinnersPaginationPage } = winnersPagination.actions;
export default winnersPagination.reducer;
