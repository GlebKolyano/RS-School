import React, { useEffect } from 'react';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useBicycles } from '../../hooks/useBicycles';
import { getBicycles } from '../../store/actions/bicycleSliceAction';
import Filters from '../Filters';
import Items from './Items';
import Loader from '../UI/Loader';
import Error from '../UI/Error';

const Main = () => {
  const dispatch = useAppDispatch();
  const { bicycles, isLoading, error } = useAppSelector((state) => state.bicycleReducer);

  useEffect(() => dispatch(getBicycles()), [dispatch]);
  const filteredBicycles = useBicycles(bicycles);

  return (
    <div className="main" data-testid="main">
      <Filters />
      {isLoading ? <Loader /> : <Items bicycles={filteredBicycles} isLoading={isLoading} />}
      {error && <Error iconName="sentiment_very_dissatisfied" text={error} />}
    </div>
  );
};

export default Main;
