import React from 'react';
import './style.scss';
import WinnerService from '../../../../services/WinnerService';
import { startAnimationCar, stopAnimationCar } from '../../../../events/animationCar';
import { INewCar, IWinner } from '../../../../global/models';
import { generateRandomName, getRandomColor } from '../../../../global/utils';
import { useTypedDispatch, useTypedSelector } from '../../../../hooks/reduxHooks';
import { createNewCar } from '../../../../store/slices/car/slice';
import {
  disableRaceStartBtn,
  setRaceFinished,
  setRaceStarted,
  undisableRaceStartBtn
} from '../../../../store/slices/race/slice';
import {
  disablePaginationCarsBtns,
  undisablePaginationCarsBtns
} from '../../../../store/slices/pagination/carsPagination/slice';
import { setModalTextByID, toggleVisibilityModalByID } from '../../../../store/slices/modal/slice';
import { SHOW_WINNER_MODAL } from '../../../../global/constants';
import Button from '../../../UI/Button';

const RaceController = () => {
  const dispatch = useTypedDispatch();
  const { cars } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { isRaceActive, isDisabledRaceStartBtn } = useTypedSelector(
    ({ raceReducer }) => raceReducer
  );

  const generateCarsHandler = () => {
    const createCar = (): INewCar => {
      const color = getRandomColor();
      const name = generateRandomName();
      return {
        color,
        name
      };
    };

    (async () => {
      const newCars = Array.from({ length: 100 }, () => createCar());
      await Promise.all(newCars.map((newCar) => dispatch(createNewCar(newCar))));
    })().catch((error) => console.log(error));
  };

  const startRaceHandler = () => {
    dispatch(setRaceStarted());
    dispatch(disableRaceStartBtn());
    dispatch(disablePaginationCarsBtns());

    (async () => {
      setTimeout(() => dispatch(setRaceFinished()), 10000);
      await Promise.any(cars.map((car) => startAnimationCar(car))).then(
        async ({ name, id, finalTime }) => {
          const isWinnerInTable = await WinnerService.getWinner(id);

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
          dispatch(setRaceFinished());
        }
      );
    })().catch((error) => console.log(error));
  };

  const resetRaceHandler = () => {
    dispatch(setRaceStarted());
    dispatch(disableRaceStartBtn());

    (async () => {
      await Promise.all(cars.map(({ id }) => stopAnimationCar(id))).finally(() => {
        dispatch(setRaceFinished());
        dispatch(undisableRaceStartBtn());
        dispatch(undisablePaginationCarsBtns());
      });
    })().catch((error) => console.log(error));
  };

  return (
    <div className="race-controller">
      <Button
        onClick={startRaceHandler}
        disabled={isDisabledRaceStartBtn}
        text="Race"
        className="race-controller__button-race"
      />
      <Button
        onClick={resetRaceHandler}
        disabled={isRaceActive}
        className="race-controller__button-reset"
        text="Reset"
      />
      <Button
        onClick={generateCarsHandler}
        disabled={isRaceActive}
        text="Generate Cars"
        className="race-controller__button-generate"
      />
    </div>
  );
};

export default RaceController;
