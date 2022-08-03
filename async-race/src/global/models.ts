export enum URL {
  garage = 'http://127.0.0.1:3000/garage',
  engine = 'http://127.0.0.1:3000/engine',
  winners = 'http://127.0.0.1:3000/winners'
}

export interface ICars {
  cars: ICar[];
}

export interface ICar {
  id?: number;
  name: string;
  color: string;
}

export interface IWinners {
  winners: IWinner[];
}
export interface IWinner {
  id?: number;
  time: number;
  wins: number;
  color?: string;
  name?: string;
  numberInTable?: number;
}

export interface IEngineParams {
  velocity: number;
  distance: number;
}

export interface IEngineCar {
  idCar: number;
  velocity: number;
  distance: number;
  speed: number;
  status: 'started' | 'stopped';
  driveMode: boolean;
  driveModeError?: unknown | string;
}

export type StoragePropType = string;
export type StorageReturnType = StoragePropType | null;

export type ErrorType = string;
export type EngineReturnType = IEngineParams | ErrorType;
export type EngineDriveModeReturnType = boolean | ErrorType;

export enum SortingTypes {
  WINS_ASC = 'wins_asc',
  WINS_DESC = 'wins_desc',
  TIME_ASC = 'time_asc',
  TIME_DESC = 'time_desc'
}
