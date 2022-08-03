import React, { useEffect, useState } from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { ReactComponent as CarModel } from '../../assets/car.svg';
import { changeSortingType, getWinners } from '../../store/slices/winnners/slice';
import { changeWinnersPaginationPage } from '../../store/slices/pagination/winnersPagination/slice';
import Pagination from '../../components/Pagination';
import useWinners from '../../hooks/useWinners';
import { IWinner, SortingTypes } from '../../global/models';

function Winners() {
  const dispatch = useTypedDispatch();

  const { totalWinners } = useTypedSelector(({ winnersReducer }) => winnersReducer);
  const { currentPageWinnersPagintion } = useTypedSelector(
    ({ winnersPaginationReducer }) => winnersPaginationReducer
  );
  const [pageCountWinnersPagination, setPageCountWinnersPagination] = useState<number>(1);
  const [timeSorting, setTimeSorting] = useState(false);
  const [winsSorting, setWinsSorting] = useState(false);
  const [currentPageWinners, setCurrentPageWinners] = useState<IWinner[]>([]);
  const WINNERS_PER_PAGE = 10;

  useEffect(() => {
    (async () => {
      await dispatch(getWinners());
    })().catch(() => {});
  }, [dispatch]);

  const sortedWinners = useWinners();

  useEffect(() => {
    const setPageCountValue = () => {
      const result = Math.ceil(sortedWinners.length / WINNERS_PER_PAGE);
      setPageCountWinnersPagination(result);
    };
    const arr = sortedWinners.slice(
      (currentPageWinnersPagintion - 1) * WINNERS_PER_PAGE,
      (currentPageWinnersPagintion - 1) * WINNERS_PER_PAGE + WINNERS_PER_PAGE
    );
    setCurrentPageWinners(arr);
    setPageCountValue();
  }, [currentPageWinnersPagintion, sortedWinners]);

  // handlers
  const changeWinnersPaginationHandler = (nextPage: number) => {
    dispatch(changeWinnersPaginationPage(nextPage));
  };
  const toggleTimeSortingHandler = () => {
    const { TIME_ASC, TIME_DESC } = SortingTypes;
    setTimeSorting(!timeSorting);
    const newSortingType = timeSorting ? TIME_ASC : TIME_DESC;
    dispatch(changeSortingType(newSortingType));
  };
  const toggleWinsSortingHandler = () => {
    const { WINS_ASC, WINS_DESC } = SortingTypes;
    setWinsSorting(!winsSorting);
    const newSortingType = winsSorting ? WINS_DESC : WINS_ASC;
    dispatch(changeSortingType(newSortingType));
  };

  return (
    <div className="winners">
      <div className="winners__wrapper">
        <h1 className="winners__counter">
          Winners ({sortedWinners.length}) Page ({pageCountWinnersPagination})
        </h1>
        <table width="100%" cellPadding="10" cellSpacing="1" align="center">
          <tbody>
            <tr>
              <th>№</th>
              <th>model</th>
              <th onClick={toggleWinsSortingHandler}>wins</th>
              <th onClick={toggleTimeSortingHandler}>time</th>
            </tr>
            {currentPageWinners.map(({ time, wins, color, name }, indexWinner) => {
              return (
                <tr className="winners__row" key={uuidv4()}>
                  <td>{indexWinner + 1}</td>

                  <td>
                    {name} <CarModel fill={color} />
                  </td>
                  <td>{wins}</td>
                  <td>{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        pageCount={pageCountWinnersPagination}
        onPageChange={changeWinnersPaginationHandler}
      />
    </div>
  );
}

export default Winners;
