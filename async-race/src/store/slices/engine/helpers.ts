import { IEngineInitialState } from './models';

export const setError = (state: IEngineInitialState, payload: unknown | string) => {
  const stateVar = state;
  stateVar.fetchStatus = 'rejected';
  stateVar.error = payload as string;
  throw new Error(payload as string);
};
