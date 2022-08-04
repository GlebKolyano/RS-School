import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRaceActive: false,
  isRaceFinished: false
};

export const buttonsSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    setRaceStarted: (state) => {
      const stateVar = state;
      stateVar.isRaceActive = true;
    },
    setRaceFinished: (state) => {
      const stateVar = state;
      stateVar.isRaceActive = false;
    }
  }
});

export const { setRaceFinished, setRaceStarted } = buttonsSlice.actions;
export default buttonsSlice.reducer;
