import React, { useEffect } from 'react';
import './style.scss';
import Filters from '../Filters';
import MainItems from './MainItems';
import Loader from '../UI/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getBicycles } from '../../store/actions/bicycleSliceAction';
import { useBicycles } from '../../hooks/useBicycles';

function Main() {
  const dispatch = useAppDispatch();
  const { bicycles, isLoading, error } = useAppSelector((state) => state.bicycleReducer);
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const { sortOption } = useAppSelector((state) => state.sortReducer);
  const filtersByValue = useAppSelector((state) => state.filterByValueReducer);
  const filtersByRange = useAppSelector((state) => state.filterByRangeReducer);

  useEffect(() => dispatch(getBicycles()), [dispatch]);

  const filterBySearchBicycles = useBicycles(
    bicycles,
    searchValue,
    sortOption,
    filtersByValue,
    filtersByRange
  );

  return (
    <div className="main">
      <Filters />
      {isLoading ? (
        <Loader />
      ) : (
        <MainItems bicycles={filterBySearchBicycles} isLoading={isLoading} />
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
}

export default Main;
