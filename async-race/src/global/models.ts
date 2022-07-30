export interface ICars {
  cars: ICar[];
}

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export type TNewCarProps = {
  color: string;
  name: string;
};
