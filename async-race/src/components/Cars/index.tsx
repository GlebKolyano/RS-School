import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { fetchCars } from '../../store/slices/cars/slice';
import { changeCarsPaginationPage } from '../../store/slices/pagination/carsPagination/slice';
import Error from '../UI/Error';
import Car from './Car';
import { CARS_PER_PAGE } from './constants';
import './style.scss';

const Cars = () => {
  const dispatch = useTypedDispatch();

  const { cars, totalCars, error, status } = useTypedSelector(({ carsReducer }) => carsReducer);
  const { currentPageCarsPagintion } = useTypedSelector(
    ({ carsPaginationReducer }) => carsPaginationReducer
  );

  const [pageCountCarsPagination, setPageCountCarsPagination] = useState<number>(1);
  const [pageTest, setPageTest] = useState(currentPageCarsPagintion || 1);

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

  const changePageTestPrev = () => {
    setPageTest(pageTest > 1 ? pageTest - 1 : pageTest);
  };

  const changePageTestNext = () => {
    setPageTest(pageTest < pageCountCarsPagination ? pageTest + 1 : pageTest);
  };

  useEffect(() => {
    dispatch(changeCarsPaginationPage(pageTest));
  }, [dispatch, pageTest]);

  if (error) {
    return <Error text={error} />;
  }

  if (status === 'loading') {
    return <p>Идёт загрузка...</p>;
  }

  return (
    <div className="cars">
      <div className="cars__items">
        {cars.map((car) => {
          return <Car key={uuidv4()} car={car} />;
        })}
      </div>
      <div className="cars__pagination">
        <div>pageTest: {pageTest}</div>
        <button type="button" onClick={changePageTestPrev}>
          prev
        </button>
        <button type="button" onClick={changePageTestNext}>
          next
        </button>
      </div>
    </div>
  );
};

export default Cars;
