export interface IData {
  bicycles: IBicycle[];
}

export interface IBicycle {
  id: number;
  name: string;
  quantity: number;
  type: string;
  brand: string;
  speeds: number;
  color: string;
  weight: number;
  isPopular: boolean;
  inBasket: boolean;
  image: string;
  price: number;
}

export enum SortOptions {
  name_asc = 'name_asc',
  name_desc = 'name_desc',
  price_asc = 'price_asc',
  price_desc = 'price_desc',
  quantity_asc = 'quantity_asc',
  quantity_desc = 'quantity_desc'
}

export interface ISearchInitialState {
  searchValue: string;
}

export interface ISortInitialState {
  sortOption: string;
}

export interface IFilterByValueInitialState {
  filterByCompany: string[];
  filterByType: string[];
  filterByColor: string[];
  filterByPopular: boolean;
}

export type FilterByRangePayload = {
  min: number;
  max: number;
};
export interface IFilterByRangeInitialState {
  filterByQuantity: FilterByRangePayload;
  filterByPrice: FilterByRangePayload;
}

export interface IStorageFilters {
  filterByValue: IFilterByValueInitialState;
  filterByRange: IFilterByRangeInitialState;
  sort: ISortInitialState;
  search: ISearchInitialState;
}

export type StoragePropType =
  | IFilterByRangeInitialState
  | string
  | string[]
  | IFilterByValueInitialState
  | IBicycle[]
  | number[];

export type StorageReturnType = StoragePropType | null;

export interface ICartInitialState {
  itemsInCart: number[];
}
export interface IBicycleInitialState {
  bicycles: IBicycle[];
  isLoading: boolean;
  error: string;
}

type ModalObjType = {
  [id: string]: boolean;
};

export interface IModalInitialState {
  modalsID: ModalObjType;
}

export interface IStoreInitialState {
  filterByRangeReducer: IFilterByRangeInitialState;
  filterByValueReducer: IFilterByValueInitialState;
  bicycleReducer: IBicycleInitialState;
  cartReducer: ICartInitialState;
  modalReducer: IModalInitialState;
  searchReducer: ISearchInitialState;
  sortReducer: ISortInitialState;
}
