import { IBicycle } from '../../models/models';

export interface IBicycleState {
  bicycles: IBicycle[];
  isLoading: boolean;
  error: string;
}

export interface ISearchSlice {
  searchValue: string;
}

export interface ISortSlice {
  sortOption: string;
}
