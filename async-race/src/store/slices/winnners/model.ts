import { IWinner } from '../../../global/models';

export interface IWinnersInitialState {
  winners: IWinner[];
  totalWinners: number;
  status: string;
  error: string;
}

export type TGetWinnersProps = {
  page: number;
  limit: number;
};
