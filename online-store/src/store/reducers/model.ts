import { IBicycle } from '../../models/models';

export interface IBicycleState {
  bicycles: IBicycle[];
  isLoading: boolean;
  error: string;
}
