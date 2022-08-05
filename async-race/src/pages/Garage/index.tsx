import React from 'react';
import './style.scss';
import Cars from '../../components/Cars';
import GarageControllers from '../../components/GarageControllers';
import GarageInfo from '../../components/GarageInfo';
import Modals from '../../components/Modals';

const Garage = () => {
  return (
    <div className="garage">
      <GarageControllers />
      <GarageInfo />
      <Cars />
      <Modals />
    </div>
  );
};

export default Garage;
