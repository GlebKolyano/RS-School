import React, { useEffect, useState } from 'react';
import './style.scss';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import Cars from '../../components/Cars';
import Error from '../../components/UI/Error';
import Controllers from '../../components/Controllers';
import { fetchCars } from '../../store/slices/cars/slice';
import { CARS_PER_PAGE } from './constants';
import Pagination from '../../components/Pagination';
import { changeCarsPaginationPage } from '../../store/slices/pagination/carsPagination/slice';

const Garage = () => {
  const dispatch = useTypedDispatch();

  const { error, status, totalCars } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { currentPageCarsPagintion } = useTypedSelector(
    ({ carsPaginationReducer }) => carsPaginationReducer
  );
  const [pageCountCarsPagination, setPageCountCarsPagination] = useState<number>(1);

  useEffect(
    function loadCars() {
      const setPageCountValue = () => {
        const result = Math.ceil(totalCars / CARS_PER_PAGE);
        setPageCountCarsPagination(result);
      };

      (async () => {
        const params = {
          page: currentPageCarsPagintion,
          limit: CARS_PER_PAGE
        };
        await dispatch(fetchCars(params));
      })().catch(() => {});

      setPageCountValue();
    },
    [dispatch, currentPageCarsPagintion, totalCars]
  );

  const changeCarsPaginationPageHandler = (nextPage: number) =>
    dispatch(changeCarsPaginationPage(nextPage));

  if (error) {
    return <Error text={error} />;
  }

  if (status === 'loading') {
    return <p>Идёт загрузка...</p>;
  }

  return (
    <div className="garage">
      <Controllers />
      <h1>
        Garage ({totalCars}) / Page ({currentPageCarsPagintion})
      </h1>
      <Cars />
      <Pagination
        pageCount={pageCountCarsPagination}
        onPageChange={changeCarsPaginationPageHandler}
      />
    </div>
  );
};

export default Garage;
