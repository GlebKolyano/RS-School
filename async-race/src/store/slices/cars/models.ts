import { ICar } from '../../../global/models';

export interface ICarsInitialState {
  cars: ICar[];
  totalCars: number;
  selectedCar: ICar | null;
  animations: { [index: number]: number };
  status: string;
  error: string;
}

export type TFetchCarsProps = {
  page: number;
  limit: number;
};
