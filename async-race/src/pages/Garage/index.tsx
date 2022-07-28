import React, { useEffect } from 'react';
import './style.scss';

import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { fetchCars } from '../../store/slices/cars/thunks';
import Cars from '../../components/Cars';
import Error from '../../components/UI/Error';

const Garage = () => {
  const dispatch = useTypedDispatch();
  const { cars, error, status } = useTypedSelector(({ carsReducer }) => carsReducer);

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
    <div className="garage">
      Garage ({cars.length}) / Page (1)
      <button type="button" onClick={handleGetCars}>
        get Cars from server
      </button>
      {status === 'loading' && <p>Идёт загрузка...</p>}
      {error && <Error text={error} />}
      <Cars />
    </div>
  );
};

export default Garage;
