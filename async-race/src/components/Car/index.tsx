import React from 'react';
import './style.scss';
import { TCarProps } from './models';
import { ReactComponent as CarModel } from '../../assets/car.svg';

const Car = ({ car }: TCarProps) => {
  const { name, color } = car;

  return (
    <div className="car">
      <div className="car__edit">
        <button type="button">select</button>
        <button type="button">remove</button>
        <p>{name}</p>
      </div>
      <div className="car__view">
        <div className="car__controls">
          <button type="button">start</button>
          <button type="button">stop</button>
        </div>
        <div className="car__icons">
          <CarModel className="car__image" fill={color} />
          <img className="car__finish" src="./images/finish.svg" alt="finish" />
        </div>
      </div>
    </div>
  );
};

export default Car;
