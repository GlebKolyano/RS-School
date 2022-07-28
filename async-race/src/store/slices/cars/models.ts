import { ICar } from '../../../global/models';

export interface ICarsInitialState {
  cars: ICar[];
  total: number;
  status: string;
  error: string;
  selectedCar: ICar | null;
}

export type TFetchCarsProps = {
  page: number;
  limit: number;
};
