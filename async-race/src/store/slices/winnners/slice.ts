import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWinner, URL } from '../../../global/models';
import CarService from '../../../services/CarService';
import { setError } from './helpers';
import { IWinnersInitialState, TGetWinnersProps } from './model';

const initialState: IWinnersInitialState = {
  winners: [],
  totalWinners: 0,
  status: '',
  error: ''
};

function getColorAndNameForWinner(winners: IWinner[]) {
  const result = winners.map(async ({ time, wins, id }) => {
    const { color, name } = await CarService.getCar(id as number);
    const newWinnerObject: IWinner = { color, name, time, wins, id };
    return newWinnerObject;
  });

  return result;
}

export const getWinners = createAsyncThunk(
  'winners/getWinners',
  async ({ page = 1, limit = 5 }: TGetWinnersProps, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${URL.winners}?_page=${page}&_limit=${limit}`);

      if (!response.ok) {
        throw new Error('No winners for loading!');
      }
      const total = response.headers.get('x-total-count');
      const winners = (await response.json()) as IWinner[];

      dispatch(setTotalWinners(Number(total)));

      const result = Promise.all(getColorAndNameForWinner(winners));
      return await result;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setTotalWinners: (state, { payload }: PayloadAction<number>) => {
      const stateVar = state;
      stateVar.totalWinners = payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getWinners.pending, (state) => {
      const stateVar = state;
      stateVar.status = 'loading';
      stateVar.error = '';
    });
    builder.addCase(getWinners.fulfilled, (state, { payload }: PayloadAction<IWinner[]>) => {
      const stateVar = state;
      stateVar.status = 'resolved';
      stateVar.winners = payload;
    });
    builder.addCase(getWinners.rejected, (state, { payload }: PayloadAction<unknown | string>) =>
      setError(state, payload)
    );
  }
});

export const { setTotalWinners } = winnersSlice.actions;
export default winnersSlice.reducer;
