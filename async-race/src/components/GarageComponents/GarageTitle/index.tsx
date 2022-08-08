import React from 'react';
import { useTypedSelector } from '../../../hooks/reduxHooks';

const GarageInfo = () => {
  const { totalCars } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { currentPageCarsPagination } = useTypedSelector(
    ({ carsPaginationReducer }) => carsPaginationReducer
  );

  return (
    <div className="garage__title">
      <h2>
        Garage ({totalCars}) / Page ({currentPageCarsPagination})
      </h2>
    </div>
  );
};

export default GarageInfo;
