import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICar } from '../../../global/models';
import { removeCar } from './slice';
import { GET_CARS_REQUEST } from './constants';

export const fetchCars = createAsyncThunk('cars/fetchCars', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(GET_CARS_REQUEST);

    if (!response.ok) {
      throw new Error('No cars for loading!');
    }

    const data = (await response.json()) as Promise<ICar[]>;
    return await data;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue(error);
  }
});

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
      return dispatch(removeCar(id));
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);
