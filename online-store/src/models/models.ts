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
