import { ICar } from '../../../global/models';

export interface ICarsInitialState {
  cars: ICar[];
  status: string;
  error: string;
}
