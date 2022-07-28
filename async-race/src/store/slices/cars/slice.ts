/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../../global/models';
import { setError } from './helpers';
import { ICarsInitialState, TFetchCarsProps } from './models';
import { GET_CARS_REQUEST } from './constants';
// eslint-disable-next-line import/no-cycle
import { TRootState } from '../../models';

const initialState: ICarsInitialState = {
  cars: [],
  total: 0,
  status: '',
  error: '',
  selectedCar: null
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
      return dispatch(setTotalCars(Number(total)));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const createNewCar = createAsyncThunk(
  'cars/createNewCar',
  async (car: { name: string; color: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(GET_CARS_REQUEST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      });

      if (!response.ok) {
        throw new Error("You can't create this car!");
      }
      const total = response.headers.get('x-total-count');
      return dispatch(setTotalCars(Number(total)));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const updateParamsCar = createAsyncThunk(
  'cars/createNewCar',
  async (
    { color, name }: { name: string; color: string },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { carsReducer } = getState() as TRootState;
      let { selectedCar } = carsReducer;
      const { id } = selectedCar as ICar;

      const response = await fetch(`${GET_CARS_REQUEST}${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          color,
          name
        })
      });

      if (!response.ok) {
        throw new Error("You can't create this car!");
      }
      const total = response.headers.get('x-total-count');
      selectedCar = null;
      return dispatch(setTotalCars(Number(total)));
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
    setTotalCars: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.total = payload;
    },
    selectCar: (state, { payload }: PayloadAction<ICar>) => {
      const stateVar = state;
      stateVar.selectedCar = payload;
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

export const { setTotalCars, selectCar } = carsSlice.actions;
export default carsSlice.reducer;
