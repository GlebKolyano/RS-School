import React, { useEffect, useState } from 'react';
import './style.scss';
import ReactPaginate from 'react-paginate';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import Cars from '../../components/Cars';
import Error from '../../components/UI/Error';
import Controllers from '../../components/Controllers';
import { fetchCars } from '../../store/slices/cars/slice';
import { CARS_PER_PAGE } from './constants';

const Garage = () => {
  const dispatch = useTypedDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const { error, status, total } = useTypedSelector(({ carsReducer }) => carsReducer);

  const [totalCars, setTotalCars] = useState(total);

  useEffect(() => {
    const setPageCountValue = () => {
      const result = Math.ceil(total / CARS_PER_PAGE);
      setPageCount(result);
    };

    const fetchData = async () => {
      const props = {
        page: currentPage,
        limit: CARS_PER_PAGE
      };
      await dispatch(fetchCars(props));
    };
    fetchData().then(
      () => {},
      () => {}
    );
    setPageCountValue();
    setTotalCars(total);
  }, [dispatch, currentPage, total]);

  const pageChangeHandler = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="garage">
      <Controllers />
      <h1>
        Garage ({totalCars}) / Page ({currentPage})
      </h1>
      {status === 'loading' && <p>Идёт загрузка...</p>}
      {error && <Error text={error} />}
      <Cars />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => pageChangeHandler(e)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName="pagination"
        pageClassName="pagination__page"
        previousClassName="pagination__prev"
        nextClassName="pagination__next"
      />
    </div>
  );
};

export default Garage;
