import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRaceActive: false,
  isDisabledRaceStartBtn: false
};

export const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setRaceStarted: (state) => {
      const stateVar = state;
      stateVar.isRaceActive = true;
    },
    setRaceFinished: (state) => {
      const stateVar = state;
      stateVar.isRaceActive = false;
    },
    disableRaceStartBtn: (state) => {
      const stateVar = state;
      stateVar.isDisabledRaceStartBtn = true;
    },
    undisableRaceStartBtn: (state) => {
      const stateVar = state;
      stateVar.isDisabledRaceStartBtn = false;
    }
  }
});

export const { setRaceFinished, setRaceStarted, disableRaceStartBtn, undisableRaceStartBtn } =
  raceSlice.actions;
export default raceSlice.reducer;
