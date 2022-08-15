import { IWinner } from '../global/models';

export type TWinnerParamsForUpdate = Pick<IWinner, 'time' | 'wins'>;
