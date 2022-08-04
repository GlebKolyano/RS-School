import React from 'react';
import './style.scss';
import Cars from '../../components/Cars';
import GarageControllers from '../../components/GarageControllers';
import GarageInfo from '../../components/GarageInfo';

const Garage = () => {
  return (
    <div className="garage">
      <GarageControllers />
      <GarageInfo />
      <Cars />
    </div>
  );
};

export default Garage;
