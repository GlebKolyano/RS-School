import React from 'react';
import WinnerService from '../../../services/WinnerService';
import { startAnimationCar, stopAnimationCar } from '../../../events/animationCar';
import { ICar, IWinner } from '../../../global/models';
import { generateRandomName, getRandomColor } from '../../../global/utils';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/reduxHooks';
import {
  createNewCar,
  disableSelectRemoveBtns,
  undisableSelectRemoveBtns
} from '../../../store/slices/cars/slice';
import {
  disableRaceStartBtn,
  setRaceFinished,
  setRaceStarted,
  undisableRaceStartBtn
} from '../../../store/slices/race/slice';
import {
  disablePaginationCarsBtns,
  undisablePaginationCarsBtns
} from '../../../store/slices/pagination/carsPagination/slice';

const RaceController = () => {
  const dispatch = useTypedDispatch();
  const { cars } = useTypedSelector(({ carsReducer }) => carsReducer);

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
    dispatch(setRaceStarted());
    dispatch(disablePaginationCarsBtns());
    dispatch(disableSelectRemoveBtns());
    dispatch(disableRaceStartBtn());

    (async () => {
      setTimeout(() => dispatch(setRaceFinished()), 5000);
      await Promise.any(cars.map(({ id }) => startAnimationCar(id as number))).then(
        async ({ id, finishingTime }) => {
          const isWinnerInTable = await WinnerService.getWinner(id);
          dispatch(setRaceFinished());

          if (isWinnerInTable) {
            const { time, wins } = isWinnerInTable as IWinner;
            const finalTime = finishingTime >= time ? time : finishingTime;
            const updatedWinsCounter = wins + 1;

            const newUpdatedScoreOfWinner: IWinner = {
              id,
              time: finalTime,
              wins: updatedWinsCounter
            };

            await WinnerService.updateWinner(newUpdatedScoreOfWinner);
          } else {
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
    dispatch(undisablePaginationCarsBtns());
    dispatch(disableRaceStartBtn());
    dispatch(setRaceStarted());

    (async () => {
      await Promise.all(cars.map(({ id }) => stopAnimationCar(id as number))).finally(() => {
        dispatch(undisableRaceStartBtn());
        dispatch(setRaceFinished());
        dispatch(undisableSelectRemoveBtns());
      });
    })().catch(() => {});
  }

  const { isRaceActive, isDisabledRaceStartBtn } = useTypedSelector(
    ({ raceReducer }) => raceReducer
  );

  return (
    <div>
      <button type="button" onClick={startRaceHandler} disabled={isDisabledRaceStartBtn}>
        Race
      </button>
      <button type="button" onClick={resetRaceHandler} disabled={isRaceActive}>
        Reset
      </button>
      <button type="button" disabled={isRaceActive} onClick={generateCarsHandler}>
        Generate Cars
      </button>
    </div>
  );
};

export default RaceController;
