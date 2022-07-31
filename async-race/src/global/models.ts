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

export interface IWinners {
  winners: IWinner[];
}
export interface IWinner {
  id: number;
  time: number;
  wins: number;
}

export type TNewCar = {
  color: string;
  name: string;
};

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
export type EngineDriveModeReturnType = { success: boolean } | ErrorType;
