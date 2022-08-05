import React from 'react';
import './style.scss';
import { ReactComponent as CarModel } from '../../../assets/car.svg';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/reduxHooks';
import { deleteCar, selectCar } from '../../../store/slices/car/slice';
import { startAnimationCar, stopAnimationCar } from '../../../events/animationCar';
import { ICar } from '../../../global/models';
import { deleteWinner } from '../../../store/slices/winnner/slice';

const Car = ({ car }: { car: ICar }) => {
  const { selectedCar, isDisabledSelectRemoveBtns } = useTypedSelector(
    ({ carsReducer }) => carsReducer
  );
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
    (async () => {
      await startAnimationCar(car);
    })().catch(() => {});
  };

  const stopAnimationHandler = () => {
    (async () => {
      await stopAnimationCar(id);
    })().catch(() => {});
  };

  return (
    <div className={selectedCar?.id === id ? 'car car_selected' : 'car'}>
      <div className="car__edit">
        <button type="button" disabled={isDisabledSelectRemoveBtns} onClick={selectCarHandler}>
          select
        </button>
        <button type="button" disabled={isDisabledSelectRemoveBtns} onClick={removeCarHandler}>
          remove
        </button>
        <p>{name}</p>
      </div>
      <div className="car__view">
        <div className="car__controls">
          <button
            type="button"
            className="car__button-start"
            data-id={id}
            onClick={startAnimationHandler}
          >
            start
          </button>
          <button
            type="button"
            className="car__button-stop"
            data-id={id}
            onClick={stopAnimationHandler}
          >
            stop
          </button>
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
