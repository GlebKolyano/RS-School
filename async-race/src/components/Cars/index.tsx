import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { fetchCars } from '../../store/slices/car/slice';
import { changeCarsPaginationPage } from '../../store/slices/pagination/carsPagination/slice';
import Button from '../UI/Button';
import Car from './Car';
import { CARS_PER_PAGE } from './constants';
import './style.scss';

const Cars = () => {
  const dispatch = useTypedDispatch();

  const { cars, totalCars } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { currentPageCarsPagination, isDisabledPaginationCarsBtns } = useTypedSelector(
    ({ carsPaginationReducer }) => carsPaginationReducer
  );

  const [pageCountCarsPagination, setPageCountCarsPagination] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(currentPageCarsPagination || 1);

  useEffect(
    function loadCars() {
      const setPageCountValue = () => {
        const result = Math.ceil(totalCars / CARS_PER_PAGE);
        setPageCountCarsPagination(result);
      };

      (async () => {
        const params = {
          page: currentPageCarsPagination,
          limit: CARS_PER_PAGE
        };
        await dispatch(fetchCars(params));
      })().catch(() => {});

      setPageCountValue();
    },
    [dispatch, currentPageCarsPagination, totalCars]
  );

  const changePagePrev = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const changePageNext = () => {
    setCurrentPage(currentPage < pageCountCarsPagination ? currentPage + 1 : currentPage);
  };

  useEffect(() => {
    dispatch(changeCarsPaginationPage(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="cars">
      <div className="cars__items">
        {cars.map((car) => {
          return <Car key={uuidv4()} car={car} />;
        })}
      </div>
      <div className="cars__pagination">
        <Button onClick={changePagePrev} disabled={isDisabledPaginationCarsBtns} text="prev" />
        <Button onClick={changePageNext} disabled={isDisabledPaginationCarsBtns} text="next" />
      </div>
    </div>
  );
};

export default Cars;
