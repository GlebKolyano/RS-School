import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get, httpDelete } from '../../../global/helpers';
import { IWinner, SortingTypes, URL } from '../../../global/models';
import WinnerService from '../../../services/WinnerService';
import { getColorAndNameForWinner, setError } from './helpers';
import { IWinnersInitialState } from './model';

const initialState: IWinnersInitialState = {
  winners: [],
  totalWinners: 0,
  sorting: SortingTypes.TIME_ASC,
  status: '',
  error: ''
};

export const getWinners = createAsyncThunk(
  'winners/getWinners',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const request = `${URL.winners}`;
      const { data, total } = await get<IWinner[]>(request).catch(() => {
        throw new Error('No winners for loading!');
      });

      dispatch(setTotalWinners(total));

      const result = Promise.all(getColorAndNameForWinner(await data));
      return await result;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const deleteWinner = createAsyncThunk('cars/deleteCar', async (id: number) => {
  const isWinnerInTable = await WinnerService.getWinner(id);

  if (isWinnerInTable) {
    const request = `${URL.winners}/${id}`;
    await httpDelete(request);
  }
});

export const winnerSlice = createSlice({
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

export const { setTotalWinners, changeSortingType } = winnerSlice.actions;
export default winnerSlice.reducer;
