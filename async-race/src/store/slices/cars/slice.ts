/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../../global/models';
import { setError } from './helpers';
import { ICarsInitialState, TFetchCarsProps } from './models';
import { GET_CARS_REQUEST } from './constants';

const initialState: ICarsInitialState = {
  cars: [],
  total: 0,
  status: '',
  error: ''
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page = 1, limit = 5 }: TFetchCarsProps, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${GET_CARS_REQUEST}?_page=${page}&_limit=${limit}`);

      if (!response.ok) {
        throw new Error('No cars for loading!');
      }
      const total = response.headers.get('x-total-count');
      const data = (await response.json()) as ICar[];

      dispatch(setTotalCars(Number(total)));

      return data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${GET_CARS_REQUEST}${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error("You can't delete this car!");
      }
      const total = response.headers.get('x-total-count');
      dispatch(setTotalCars(Number(total)));

      return dispatch(removeCar(id));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    removeCar: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.cars = stateVar.cars.filter((car) => car.id !== payload);
    },
    setTotalCars: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.total = payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCars.pending, (state) => {
      const stateVar = state;
      stateVar.status = 'loading';
      stateVar.error = '';
    });
    builder.addCase(fetchCars.fulfilled, (state, { payload }: PayloadAction<ICar[]>) => {
      const stateVar = state;
      stateVar.status = 'resolved';
      stateVar.cars = payload;
    });
    builder.addCase(fetchCars.rejected, (state, { payload }: PayloadAction<unknown | string>) =>
      setError(state, payload)
    );
    builder.addCase(deleteCar.rejected, (state, { payload }: PayloadAction<unknown | string>) =>
      setError(state, payload)
    );
  }
});

export const { removeCar, setTotalCars } = carsSlice.actions;

export default carsSlice.reducer;
