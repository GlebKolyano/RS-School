import { ICar } from '../../../global/models';

export interface ICarsInitialState {
  cars: ICar[];
  totalCars: number;
  status: string;
  error: string;
  selectedCar: ICar | null;
}

export type TFetchCarsProps = {
  page: number;
  limit: number;
};
