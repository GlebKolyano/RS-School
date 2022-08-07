import React from 'react';
import { useTypedSelector } from '../../../hooks/reduxHooks';

const GarageInfo = () => {
  const { totalCars } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { currentPageCarsPagination } = useTypedSelector(
    ({ carsPaginationReducer }) => carsPaginationReducer
  );

  return (
    <div className="garage__title">
      <h1>
        Cars in garage ({totalCars}) / Page ({currentPageCarsPagination})
      </h1>
    </div>
  );
};

export default GarageInfo;
