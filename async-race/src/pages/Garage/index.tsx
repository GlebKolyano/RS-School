import React from 'react';
import './style.scss';
import Cars from '../../components/Cars';
import GarageControllers from '../../components/GarageComponents/GarageControllers';
import GarageTitle from '../../components/GarageComponents/GarageTitle';
import Modals from '../../components/Modals';

const Garage = () => {
  return (
    <div className="garage">
      <GarageControllers />
      <GarageTitle />
      <Cars />
      <Modals />
    </div>
  );
};

export default Garage;
