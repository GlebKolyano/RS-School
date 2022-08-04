import React from 'react';
import { useTypedSelector } from '../../hooks/reduxHooks';

const GarageInfo = () => {
  const { totalCars } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { currentPageCarsPagintion } = useTypedSelector(
    ({ carsPaginationReducer }) => carsPaginationReducer
  );

  return (
    <div>
      <h1>
        Cars in garage ({totalCars}) / Page ({currentPageCarsPagintion})
      </h1>
    </div>
  );
};

export default GarageInfo;
