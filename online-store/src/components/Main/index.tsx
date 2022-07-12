import React, { useEffect } from 'react';
import './style.css';
import Filters from '../Filters';
import MainItems from './MainItems';
import Loader from '../UI/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getBicycles } from '../../store/actions/getBicycles';
import { useBicycles } from '../../hooks/useBicycles';
import { FilterProps } from '../../models/models';

function Main() {
  const dispatch = useAppDispatch();
  const { bicycles, isLoading, error } = useAppSelector((state) => state.bicycleReducer);
  const { searchValue } = useAppSelector((state) => state.searchReducer);

  const filters: FilterProps = {
    searchValue
  };

  useEffect(() => dispatch(getBicycles()), [dispatch]);

  const filterBySearchBicycles = useBicycles(bicycles, filters);

  return (
    <div className="main">
      <Filters />
      {isLoading ? <Loader /> : <MainItems bicycles={filterBySearchBicycles} />}
      {error && <h1>Приозошла ошибка!</h1>}
    </div>
  );
}

export default Main;
