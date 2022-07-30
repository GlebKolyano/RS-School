import React, { useEffect, useState } from 'react';
import { ICar } from '../../../global/models';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/reduxHooks';
import { createNewCar, updateParamsCar } from '../../../store/slices/cars/slice';

const CarController = () => {
  const dispatch = useTypedDispatch();
  const { selectedCar } = useTypedSelector(({ carsReducer }) => carsReducer);
  const [isSelected, setIsSelected] = useState(false);
  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('#ffffff');
  const [updateCarName, setUpdateCarName] = useState('');
  const [updateCarColor, setUpdateCarColor] = useState('#ffffff');

  useEffect(() => {
    let color = '';
    let name = '';
    if (selectedCar) {
      color = selectedCar.color;
      name = selectedCar.name;
      setUpdateCarName(name);
      setUpdateCarColor(color);
      setIsSelected(true);
    }
  }, [selectedCar]);

  const createCarNameHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCarName(value);
  };

  const createCarColorHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCarColor(value);
  };

  const updateCarNameHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setUpdateCarName(value);
  };

  const updateCarColorHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setUpdateCarColor(value);
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
      setIsSelected(false);
    };
    createCar().catch(Error);
    setUpdateCarColor('#ffffff');
    setUpdateCarName('');
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
          disabled={!isSelected}
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
