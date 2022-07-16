import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBicycle, IBicycleInitialState } from '../../models/models';

export const initialState: IBicycleInitialState = {
  bicycles: [],
  isLoading: false,
  error: ''
};

export const bicycleSlice = createSlice({
  name: 'bicycle',
  initialState,
  reducers: {
    bicyclesFetching(state) {
      const stateVar = state;
      stateVar.isLoading = true;
    },
    bicyclesFetchingSuccess(state, action: PayloadAction<IBicycle[]>) {
      const stateVar = state;
      stateVar.isLoading = false;
      stateVar.error = '';
      stateVar.bicycles = action.payload;
    },
    bicyclesFetchingError(state, action: PayloadAction<string>) {
      const stateVar = state;
      stateVar.isLoading = false;
      stateVar.error = action.payload;
    }
  }
});

export const bicycleReducer = bicycleSlice.reducer;
