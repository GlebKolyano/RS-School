import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWinner, SortingTypes, URL } from '../../../global/models';
import CarService from '../../../services/CarService';
import { setError } from './helpers';
import { IWinnersInitialState, TGetWinnersProps } from './model';

const initialState: IWinnersInitialState = {
  winners: [],
  totalWinners: 0,
  sorting: SortingTypes.TIME_ASC,
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
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${URL.winners}`);

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
    },
    changeSortingType: (state, { payload }: PayloadAction<SortingTypes>) => {
      const stateVar = state;
      stateVar.sorting = payload;
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

export const { setTotalWinners, changeSortingType } = winnersSlice.actions;
export default winnersSlice.reducer;
