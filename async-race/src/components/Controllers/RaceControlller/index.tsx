import React from 'react';
import { carBrands, carModels } from '../../../global/constants';
import { TNewCarProps } from '../../../global/models';
import { getRandomColor, getRandomNumberBetweeenTwoValues } from '../../../global/utils';
import { useTypedDispatch } from '../../../hooks/reduxHooks';
import { createNewCar } from '../../../store/slices/cars/slice';

const RaceController = () => {
  const dispatch = useTypedDispatch();

  const generateCarsHandler = () => {
    const createCar = async (carName: string) => {
      const newCar: TNewCarProps = {
        color: getRandomColor(),
        name: carName
      };
      await dispatch(createNewCar(newCar));
    };

    for (let i = 0; i < 100; i += 1) {
      const indexRandomBrand = getRandomNumberBetweeenTwoValues(0, carBrands.length);
      const randomBrand = carBrands[indexRandomBrand];
      const indexRandomfModal = getRandomNumberBetweeenTwoValues(0, carModels.length);
      const randomModel = carModels[indexRandomfModal];
      const resultedName = `${randomBrand} ${randomModel}`;
      createCar(resultedName).catch(Error);
    }
  };

  return (
    <div>
      <button type="button">Race</button>
      <button type="button">Reset</button>
      <button type="button" onClick={generateCarsHandler}>
        Generate Cars
      </button>
    </div>
  );
};

export default RaceController;
