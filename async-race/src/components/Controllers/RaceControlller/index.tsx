import React, { useState } from 'react';
import { startAnimationCar, stopAnimationCar } from '../../../events/animationCar';
import { TNewCar } from '../../../global/models';
import { generateRandomName, getRandomColor } from '../../../global/utils';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/reduxHooks';
import { createNewCar } from '../../../store/slices/cars/slice';

const RaceController = () => {
  const dispatch = useTypedDispatch();
  const { cars } = useTypedSelector(({ carsReducer }) => carsReducer);

  const [btnStartRaceIsDisabled, setBtnStartRaceIsDisabled] = useState(false);
  const [btnResetRaceIsDisabled, setBtnResetRaceIsDisabled] = useState(true);

  function generateCarsHandler() {
    const createCar = (): TNewCar => {
      return {
        color: getRandomColor(),
        name: generateRandomName()
      };
    };

    (async function wrapper() {
      const newCars = Array.from({ length: 100 }, () => createCar());
      await Promise.all(newCars.map((newCar) => dispatch(createNewCar(newCar))));
    })().catch(() => {});
  }

  function startRaceHandler() {
    setBtnStartRaceIsDisabled(true);

    (async function wrapper() {
      setTimeout(() => setBtnResetRaceIsDisabled(false), 2500);
      await Promise.any(cars.map(({ id }) => startAnimationCar(id))).then(() => {
        // console.log(result);
      });
    })().catch(() => {});
  }

  function resetRaceHandler() {
    setBtnResetRaceIsDisabled(true);

    (async function wrapper() {
      await Promise.all(cars.map(({ id }) => stopAnimationCar(id))).finally(() =>
        setBtnStartRaceIsDisabled(false)
      );
    })().catch(() => {});
  }

  return (
    <div>
      <button type="button" onClick={startRaceHandler} disabled={btnStartRaceIsDisabled}>
        Race
      </button>
      <button type="button" onClick={resetRaceHandler} disabled={btnResetRaceIsDisabled}>
        Reset
      </button>
      <button type="button" onClick={generateCarsHandler}>
        Generate Cars
      </button>
    </div>
  );
};

export default RaceController;
