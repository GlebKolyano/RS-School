export enum URL {
  garage = 'http://127.0.0.1:3000/garage',
  engine = 'http://127.0.0.1:3000/engine',
  winners = 'http://127.0.0.1:3000/winners'
}

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
