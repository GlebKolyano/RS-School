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
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  QUANTITY_ASC = 'quantity_asc',
  QUANTITY_DESC = 'quantity_desc'
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
  filterByRange: IFilterByRangeInitialState;
  filterByValue: IFilterByValueInitialState;
  bicycle: IBicycleInitialState;
  cart: ICartInitialState;
  modal: IModalInitialState;
  search: ISearchInitialState;
  sort: ISortInitialState;
}
