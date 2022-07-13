export interface IData {
  bicycles: IBicycle[];
}

export interface IBicycle {
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

export interface ISearchSlice {
  searchValue: string;
}

export interface ISortSlice {
  sortOption: string;
}

export interface IFilterByValueSlice {
  filterByCompany: string[];
  filterByType: string[];
  filterByColor: string[];
  filterByPopular: boolean;
}

export type FilterByRangePayload = {
  min: number;
  max: number;
};
export interface IFilterByRangeSlice {
  filterByQuantity: FilterByRangePayload;
  filterByPrice: FilterByRangePayload;
}

export interface IStorageFilters {
  filterByValue: IFilterByValueSlice;
  filterByRange: IFilterByRangeSlice;
  sort: ISortSlice;
  search: ISearchSlice;
}

export type StoragePropType = IFilterByRangeSlice | string | string[] | IFilterByValueSlice;
export type StorageReturnType = StoragePropType | null;
