import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from '../../hooks/reduxHooks';
import Car from './Car';
import './style.scss';

const Cars = () => {
  const { cars } = useTypedSelector(({ carsReducer }) => carsReducer);

  return (
    <div className="cars">
      {cars.map((car) => {
        return <Car key={uuidv4()} car={car} />;
      })}
    </div>
  );
};

export default Cars;
