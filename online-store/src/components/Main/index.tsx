import React, { useEffect } from 'react';
import './style.css';
import Filters from '../Filters';
import MainItems from './MainItems';
import Loader from '../UI/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getBicycles } from '../../store/actions/getBicycles';

function Main() {
  const dispatch = useAppDispatch();
  const { bicycles, isLoading, error } = useAppSelector((state) => state.bicycleReducer);

  useEffect(() => dispatch(getBicycles()), [dispatch]);

  return (
    <div className="main">
      <Filters />
      {isLoading ? <Loader /> : <MainItems bicycles={bicycles} />}
      {error && <h1>Приозошла ошибка!</h1>}
    </div>
  );
}

export default Main;
