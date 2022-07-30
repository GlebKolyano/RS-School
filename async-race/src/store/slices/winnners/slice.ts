import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWinner, URL } from '../../../global/models';
import { setError } from './helpers';
import { IWinnersInitialState, TGetWinnersProps } from './model';

const initialState: IWinnersInitialState = {
  winners: [],
  totalWinners: 0,
  status: '',
  error: ''
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async ({ page = 1, limit = 5 }: TGetWinnersProps, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${URL.winners}?_page=${page}&_limit=${limit}`);

      if (!response.ok) {
        throw new Error('No winners for loading!');
      }
      const total = response.headers.get('x-total-count');
      const data = (await response.json()) as IWinner[];

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(setTotalWinners(Number(total)));

      return data;
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
    builder.addCase(fetchWinners.pending, (state) => {
      const stateVar = state;
      stateVar.status = 'loading';
      stateVar.error = '';
    });
    builder.addCase(fetchWinners.fulfilled, (state, { payload }: PayloadAction<IWinner[]>) => {
      const stateVar = state;
      stateVar.status = 'resolved';
      stateVar.winners = payload;
    });
    builder.addCase(fetchWinners.rejected, (state, { payload }: PayloadAction<unknown | string>) =>
      setError(state, payload)
    );
  }
});

export const { setTotalWinners } = winnersSlice.actions;
export default winnersSlice.reducer;
