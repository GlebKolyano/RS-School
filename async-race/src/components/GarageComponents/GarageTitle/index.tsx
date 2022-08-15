import React from 'react';
import { useCarPaginationSelector, useCarSelector } from '../../../store/selectors';

const GarageInfo = () => {
  const { totalCars } = useCarSelector();
  const { currentPageCarsPagination } = useCarPaginationSelector();

  return (
    <div className="garage__title">
      <h2>
        Garage ({totalCars}) / Page ({currentPageCarsPagination})
      </h2>
    </div>
  );
};

export default GarageInfo;
