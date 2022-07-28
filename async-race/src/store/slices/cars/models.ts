import { ICar } from '../../../global/models';

export interface ICarsInitialState {
  cars: ICar[];
  total: number;
  status: string;
  error: string;
}

export type TFetchCarsProps = {
  page: number;
  limit: number;
};
