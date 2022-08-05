import { IWinner, SortingTypes } from '../../../global/models';

export interface IWinnersInitialState {
  winners: IWinner[];
  totalWinners: number;
  sorting: SortingTypes;
  status: string;
  error: string;
}

export type TGetWinnersProps = {
  page: number;
  limit: number;
};
