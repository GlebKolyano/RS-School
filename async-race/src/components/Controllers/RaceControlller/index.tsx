import React, { useState } from 'react';
import WinnerService from '../../../services/WinnerService';
import { startAnimationCar, stopAnimationCar } from '../../../events/animationCar';
import { ICar, IWinner } from '../../../global/models';
import { generateRandomName, getRandomColor } from '../../../global/utils';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/reduxHooks';
import { createNewCar } from '../../../store/slices/cars/slice';

const RaceController = () => {
  const dispatch = useTypedDispatch();
  const { cars } = useTypedSelector(({ carsReducer }) => carsReducer);

  const [btnStartRaceIsDisabled, setBtnStartRaceIsDisabled] = useState<boolean>(false);
  const [btnResetRaceIsDisabled, setBtnResetRaceIsDisabled] = useState<boolean>(true);

  function generateCarsHandler() {
    const createCar = (): ICar => {
      const color = getRandomColor();
      const name = generateRandomName();
      return {
        color,
        name
      };
    };

    (async function wrapper() {
      const newCars = Array.from({ length: 100 }, () => createCar());
      await Promise.all(newCars.map((newCar) => dispatch(createNewCar(newCar))));
    })().catch(() => {});
  }

  function startRaceHandler() {
    setBtnStartRaceIsDisabled(true);

    (async () => {
      setTimeout(() => setBtnResetRaceIsDisabled(false), 5000);
      await Promise.any(cars.map(({ id }) => startAnimationCar(id as number))).then(
        async ({ id, finishingTime }) => {
          try {
            const { time, wins } = await WinnerService.isInTableWinners(id);

            const finalTime = finishingTime >= time ? time : finishingTime;
            const updatedWinsCounter = wins + 1;

            const newUpdatedScoreOfWinner: IWinner = {
              id,
              time: finalTime,
              wins: updatedWinsCounter
            };

            await WinnerService.updateWinner(newUpdatedScoreOfWinner);
          } catch (error) {
            const newWinner: IWinner = {
              id,
              time: finishingTime,
              wins: 1
            };

            await WinnerService.createWinner(newWinner);
          }
        }
      );
    })().catch(() => {});
  }

  function resetRaceHandler() {
    setBtnResetRaceIsDisabled(true);

    (async () => {
      await Promise.all(cars.map(({ id }) => stopAnimationCar(id as number))).finally(() =>
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
