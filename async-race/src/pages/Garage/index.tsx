import React from 'react';
import './style.scss';
import { useTypedSelector } from '../../hooks/reduxHooks';
import Cars from '../../components/Cars';
import Controllers from '../../components/Controllers';

const Garage = () => {
  const { totalCars } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { currentPageCarsPagintion } = useTypedSelector(
    ({ carsPaginationReducer }) => carsPaginationReducer
  );

  return (
    <div className="garage">
      <Controllers />
      <h1>
        Garage ({totalCars}) / Page ({currentPageCarsPagintion})
      </h1>
      <Cars />
    </div>
  );
};

export default Garage;
