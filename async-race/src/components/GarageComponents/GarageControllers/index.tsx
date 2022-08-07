import React from 'react';
import CarController from './CarController';
import RaceController from './RaceControlller';

const GarageControllers = () => {
  return (
    <div className="garage__controllers">
      <CarController />
      <RaceController />
    </div>
  );
};

export default GarageControllers;
