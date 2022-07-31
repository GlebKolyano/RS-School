import { IEngineCar } from '../../../global/models';

export interface IEngineInitialState {
  engines: IEngineCar[];
  fetchStatus: string;
  error: string;
}
