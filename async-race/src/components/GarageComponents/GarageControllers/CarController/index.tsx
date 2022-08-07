import React, { useEffect, useState } from 'react';
import SessionStorage from '../../../../global/helpers';
import { ICar } from '../../../../global/models';
import { useTypedDispatch, useTypedSelector } from '../../../../hooks/reduxHooks';
import {
  createNewCar,
  resetSelectedCar,
  updateParamsCar
} from '../../../../store/slices/car/slice';

const CarController = () => {
  const dispatch = useTypedDispatch();
  const { selectedCar } = useTypedSelector(({ carsReducer }) => carsReducer);
  const [isCarSelected, setIsCarSelected] = useState<boolean>(false);
  const [carName, setCarName] = useState<string>(
    SessionStorage.get('carNameCreateInputValue') || ''
  );
  const [carColor, setCarColor] = useState<string>(
    SessionStorage.get('carColorCreateInputValue') || '#ffffff'
  );
  const [updateCarName, setUpdateCarName] = useState<string>(
    SessionStorage.get('carNameUpdateInputValue') || ''
  );
  const [updateCarColor, setUpdateCarColor] = useState<string>(
    SessionStorage.get('carColorUpdateInputValue') || '#ffffff'
  );

  useEffect(
    function setStateColorAndNameFromSelectedCar() {
      let color = '';
      let name = '';
      if (selectedCar) {
        color = selectedCar.color;
        name = selectedCar.name;
        setUpdateCarName(SessionStorage.get('carNameUpdateInputValue') || name);
        setUpdateCarColor(SessionStorage.get('carColorUpdateInputValue') || color);
        setIsCarSelected(true);
      }
    },
    [selectedCar]
  );

  const createCarNameHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setCarName(value);
    SessionStorage.set('carNameCreateInputValue', value);
  };

  const createCarColorHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setCarColor(value);
    SessionStorage.set('carColorCreateInputValue', value);
  };

  const updateCarNameHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCarName(value);
    SessionStorage.set('carNameUpdateInputValue', value);
  };

  const updateCarColorHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateCarColor(value);
    SessionStorage.set('carColorUpdateInputValue', value);
  };

  function createNewCarHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const createCar = async () => {
      const newCar = {
        color: carColor,
        name: carName
      };
      await dispatch(createNewCar(newCar));
    };
    createCar().catch(Error);
    setCarColor('#ffffff');
    setCarName('');
    SessionStorage.remove('carNameCreateInputValue');
    SessionStorage.remove('carColorCreateInputValue');
  }

  function updateParamsCarHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const createCar = async () => {
      let carId = 0;
      if (selectedCar) {
        carId = selectedCar.id;
      }
      const newParamsCar: ICar = {
        color: updateCarColor,
        name: updateCarName,
        id: carId
      };

      await dispatch(updateParamsCar(newParamsCar));
      dispatch(resetSelectedCar());
      setIsCarSelected(false);
    };
    createCar().catch(Error);
    setUpdateCarColor('#ffffff');
    setUpdateCarName('');
    SessionStorage.remove('carNameUpdateInputValue');
    SessionStorage.remove('carColorUpdateInputValue');
  }

  return (
    <div className="car-controller">
      <form className="car-controller__create" onSubmit={(e) => createNewCarHandler(e)}>
        <input
          type="text"
          placeholder="name car"
          required
          value={carName}
          onChange={(e) => createCarNameHandler(e)}
        />
        <input type="color" value={carColor} onChange={(e) => createCarColorHandler(e)} />
        <button type="submit" disabled={!carName.length}>
          create car
        </button>
      </form>
      <form className="car-controller__update" onSubmit={(e) => updateParamsCarHandler(e)}>
        <input
          type="text"
          value={updateCarName}
          required
          placeholder="name car"
          disabled={!isCarSelected}
          onChange={(e) => updateCarNameHandler(e)}
        />
        <input type="color" value={updateCarColor} onChange={(e) => updateCarColorHandler(e)} />
        <button type="submit" disabled={!updateCarName.length}>
          update car
        </button>
      </form>
    </div>
  );
};

export default CarController;
