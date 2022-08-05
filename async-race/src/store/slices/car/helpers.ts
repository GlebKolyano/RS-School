import { ICarsInitialState } from './models';

export const setError = (state: ICarsInitialState, payload: unknown | string) => {
  const stateVar = state;
  stateVar.status = 'rejected';
  stateVar.error = payload as string;
};
