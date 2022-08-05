import React from 'react';
import WinnerService from '../../../services/WinnerService';
import { startAnimationCar, stopAnimationCar } from '../../../events/animationCar';
import { INewCar, IWinner } from '../../../global/models';
import { generateRandomName, getRandomColor } from '../../../global/utils';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/reduxHooks';
import {
  createNewCar,
  disableSelectRemoveBtns,
  undisableSelectRemoveBtns
} from '../../../store/slices/car/slice';
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
import { setModalTextByID, toggleVisibilityModalByID } from '../../../store/slices/modal/slice';
import { SHOW_WINNER_MODAL } from '../../../global/constants';

const RaceController = () => {
  const dispatch = useTypedDispatch();
  const { cars } = useTypedSelector(({ carsReducer }) => carsReducer);

  function generateCarsHandler() {
    const createCar = (): INewCar => {
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
    dispatch(disableRaceStartBtn());
    dispatch(disableSelectRemoveBtns());
    dispatch(disablePaginationCarsBtns());

    (async () => {
      setTimeout(() => dispatch(setRaceFinished()), 5000);
      await Promise.any(cars.map((car) => startAnimationCar(car))).then(
        async ({ name, id, finalTime }) => {
          const isWinnerInTable = await WinnerService.getWinner(id);

          dispatch(setRaceFinished());
          dispatch(
            setModalTextByID({
              modalID: SHOW_WINNER_MODAL,
              modalText: `Winner is ${name} with ID ${id}. Result of race: ${finalTime}`
            })
          );
          dispatch(toggleVisibilityModalByID(SHOW_WINNER_MODAL));

          if (isWinnerInTable) {
            const { time, wins } = isWinnerInTable as IWinner;
            const finalResult = finalTime >= time ? time : finalTime;
            const updatedWinsCounter = wins + 1;

            const newUpdatedScoreOfWinner: IWinner = {
              id,
              time: finalResult,
              wins: updatedWinsCounter
            };

            await WinnerService.updateWinner(newUpdatedScoreOfWinner);
          } else {
            const newWinner: IWinner = {
              id,
              time: finalTime,
              wins: 1
            };

            await WinnerService.createWinner(newWinner);
          }
        }
      );
    })().catch(() => {});
  }

  function resetRaceHandler() {
    dispatch(setRaceStarted());
    dispatch(disableRaceStartBtn());
    dispatch(undisablePaginationCarsBtns());

    (async () => {
      await Promise.all(cars.map(({ id }) => stopAnimationCar(id))).finally(() => {
        dispatch(setRaceFinished());
        dispatch(undisableRaceStartBtn());
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
