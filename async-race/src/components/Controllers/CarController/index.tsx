import React, { useState } from 'react';
import { useTypedDispatch } from '../../../hooks/reduxHooks';
import { createNewCar } from '../../../store/slices/cars/slice';

const CarController = () => {
  const dispatch = useTypedDispatch();
  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('#ffffff');

  const updateCarNameHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCarName(value);
  };

  const updateCarColorHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCarColor(value);
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

  return (
    <div className="car-controller">
      <form className="car-controller__create" onSubmit={(e) => createNewCarHandler(e)}>
        <input
          type="text"
          placeholder="name car"
          required
          value={carName}
          onChange={(e) => updateCarNameHandler(e)}
        />
        <input type="color" value={carColor} onChange={(e) => updateCarColorHandler(e)} />
        <button type="submit">create car</button>
      </form>
      <div className="car-controller__update">
        <input type="text" placeholder="name car" />
        <input type="color" />
        <button type="button">update car</button>
      </div>
    </div>
  );
};

export default CarController;
