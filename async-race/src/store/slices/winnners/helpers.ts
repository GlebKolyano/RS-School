import { IWinnersInitialState } from './model';

export const setError = (state: IWinnersInitialState, payload: unknown | string) => {
  const stateVar = state;
  stateVar.status = 'rejected';
  stateVar.error = payload as string;
};
