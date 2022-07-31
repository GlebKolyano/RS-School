import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEngineCar, IEngineParams, URL } from '../../../global/models';
import { setError } from './helpers';
import { IEngineInitialState } from './models';

const initialState: IEngineInitialState = {
  engines: [],
  error: '',
  fetchStatus: ''
};

export const startEngine = createAsyncThunk(
  'cars/startEngineCar',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL.engine}?id=${id}&status=started`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error('Engine is not started!');
      }
      const data = (await response.json()) as IEngineParams;

      const res: IEngineCar = {
        idCar: id,
        distance: data.distance,
        velocity: data.velocity,
        status: 'started',
        speed: Number(data.distance) / Number(data.velocity),
        driveMode: false
      };
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

export const enableDriveMode = createAsyncThunk(
  'cars/enableDriveMode',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL.engine}?id=${id}&status=drive`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error("The car's engine is broken!");
      }
      const data = (await response.json()) as { success: boolean };
      return { success: data.success, idCar: id };
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue(error);
    }
  }
);

type TSwtichDriveModePayload = {
  success: boolean;
  idCar: number;
};

export const engineSlice = createSlice({
  name: 'engine',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(startEngine.pending, (state) => {
      const stateVar = state;
      stateVar.fetchStatus = 'loading';
      stateVar.error = '';
    });
    builder.addCase(startEngine.fulfilled, (state, { payload }: PayloadAction<IEngineCar>) => {
      const stateVar = state;
      stateVar.fetchStatus = 'resolved';
      stateVar.engines.push(payload);
    });
    builder.addCase(startEngine.rejected, (state, { payload }: PayloadAction<unknown | string>) =>
      setError(state, payload)
    );
    builder.addCase(enableDriveMode.pending, (state) => {
      const stateVar = state;
      stateVar.fetchStatus = 'loading';
      stateVar.error = '';
    });
    builder.addCase(
      enableDriveMode.fulfilled,
      (state, { payload }: PayloadAction<TSwtichDriveModePayload>) => {
        const stateVar = state;
        const { idCar, success } = payload;

        stateVar.engines = state.engines.map((engine) => {
          if (engine.idCar === idCar) {
            const engineObj = engine;
            engineObj.driveMode = success;
          }
          return engine;
        });
      }
    );

    builder.addCase(
      enableDriveMode.rejected,
      (state, { payload }: PayloadAction<unknown | string>) => setError(state, payload)
    );
  }
});

export default engineSlice.reducer;
