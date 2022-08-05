import { IWinner } from '../../../global/models';
import CarService from '../../../services/CarService';
import { IWinnersInitialState } from './model';

export const setError = (state: IWinnersInitialState, payload: unknown | string) => {
  const stateVar = state;
  stateVar.status = 'rejected';
  stateVar.error = payload as string;
};

export function getColorAndNameForWinner(winners: IWinner[]) {
  const result = winners.map(async ({ time, wins, id }) => {
    const { color, name } = await CarService.getCar(id as number);
    const newWinnerObject: IWinner = { color, name, time, wins, id };
    return newWinnerObject;
  });

  return result;
}
