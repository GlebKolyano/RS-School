import React from 'react';
import './style.scss';
import { ReactComponent as CarModel } from '../../../assets/car.svg';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/reduxHooks';
import { deleteCar, selectCar } from '../../../store/slices/car/slice';
import { startAnimationCar, stopAnimationCar } from '../../../events/animationCar';
import { ICar } from '../../../global/models';
import { deleteWinner } from '../../../store/slices/winnner/slice';
import Button from '../../UI/Button';
import { setRaceFinished, setRaceStarted } from '../../../store/slices/race/slice';

const Car = ({ car }: { car: ICar }) => {
  const { selectedCar } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { isRaceActive } = useTypedSelector(({ raceReducer }) => raceReducer);
  const dispatch = useTypedDispatch();
  const { name, color, id } = car;

  const removeCarHandler = () => {
    (async () => {
      await dispatch(deleteCar(id));
      await dispatch(deleteWinner(id));
    })().catch(() => {});
  };

  const selectCarHandler = () => {
    dispatch(selectCar(car));
  };

  const startAnimationHandler = () => {
    dispatch(setRaceStarted());
    (async () => {
      await startAnimationCar(car);
    })().catch(() => {});
  };

  const stopAnimationHandler = () => {
    (async () => {
      await stopAnimationCar(id);
      dispatch(setRaceFinished());
    })().catch(() => {});
  };

  return (
    <div className={selectedCar?.id === id ? 'car car_selected' : 'car'}>
      <div className="car__edit">
        <Button onClick={selectCarHandler} text="select" disabled={isRaceActive} />
        <Button onClick={removeCarHandler} text="remove" disabled={isRaceActive} />
        <p>{name}</p>
      </div>
      <div className="car__view">
        <div className="car__controls">
          <Button
            className="car__button-start"
            onClick={startAnimationHandler}
            text="start"
            dataID={id}
            disabled={isRaceActive}
          />
          <Button
            className="car__button-stop"
            onClick={stopAnimationHandler}
            text="stop"
            dataID={id}
            disabled={!isRaceActive}
          />
        </div>
        <div className="car__icons">
          <div className="car__image" data-id={id}>
            <CarModel fill={color} />
          </div>
          <div className="car__finish" data-id={id}>
            <img src="./images/finish.svg" alt="finish" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
