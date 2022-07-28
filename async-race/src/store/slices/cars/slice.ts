import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../../global/models';
import { deleteCar, fetchCars } from './thunks';
import { setError } from './helpers';
import { ICarsInitialState } from './models';

const initialState: ICarsInitialState = {
  cars: [],
  status: '',
  error: ''
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    removeCar: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.cars = stateVar.cars.filter((car) => car.id !== payload);
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

export const { removeCar } = carsSlice.actions;
export default carsSlice.reducer;
