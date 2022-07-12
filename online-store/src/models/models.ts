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
}

export type FilterProps = {
  searchValue: string;
};

export enum SortOptions {
  name_asc = 'name_asc',
  name_desc = 'name_desc',
  weight_asc = 'weight_asc',
  weight_desc = 'weight_desc',
  quantity_asc = 'quantity_asc',
  quantity_desc = 'quantity_desc'
}
