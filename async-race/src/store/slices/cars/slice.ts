import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICar } from '../../../global/models';

export interface ICarsInitialState {
  cars: ICar[];
  status: string;
  error: null | string;
}

const initialState: ICarsInitialState = {
  cars: [],
  status: '',
  error: null
};

export async function http<T>(request: string): Promise<T> {
  const response = await fetch(request);
  const data = (await response.json()) as Promise<T>;
  return data;
}

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  const cars = await http<ICar[]>('http://127.0.0.1:3000/garage');
  return cars;
});

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCars.pending, (state, action) => {
      const stateVar = state;
      stateVar.status = 'loading';
      stateVar.error = null;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      const stateVar = state;
      stateVar.cars = action.payload;
      stateVar.status = 'resolved';
    });
    builder.addCase(fetchCars.rejected, (state, action) => {});
  }
});

export default carsSlice.reducer;
