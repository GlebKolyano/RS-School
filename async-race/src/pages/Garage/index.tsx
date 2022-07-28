import React, { useEffect } from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import Car from '../../components/Car';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { fetchCars } from '../../store/slices/cars/slice';

const Garage = () => {
  const dispatch = useTypedDispatch();
  const { cars } = useTypedSelector(({ carsReducer }) => carsReducer);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchCars());
    }
    fetchData().then(
      () => {},
      () => {}
    );
  }, [dispatch]);

  function handleGetCars() {
    const getCars = async () => {
      await dispatch(fetchCars());
    };
    getCars().catch(Error);
  }

  return (
    <div>
      Garage ({cars.length})
      <button type="button" onClick={handleGetCars}>
        get Cars from server
      </button>
      <div className="cars">
        {cars.map((car) => {
          return <Car key={uuidv4()} car={car} />;
        })}
      </div>
    </div>
  );
};

export default Garage;
