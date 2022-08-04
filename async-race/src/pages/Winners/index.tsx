import React, { useEffect, useState } from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { ReactComponent as CarModel } from '../../assets/car.svg';
import { changeSortingType, getWinners } from '../../store/slices/winnners/slice';
import { changeWinnersPaginationPage } from '../../store/slices/pagination/winnersPagination/slice';
import useWinners from '../../hooks/useWinners';
import { IWinner, SortingTypes } from '../../global/models';
import { WINNERS_PER_PAGE } from './constants';

const Winners = () => {
  const dispatch = useTypedDispatch();

  const { currentPageWinnersPagintion } = useTypedSelector(
    ({ winnersPaginationReducer }) => winnersPaginationReducer
  );
  const [pageCountWinnersPagination, setPageCountWinnersPagination] = useState<number>(1);
  const [timeSorting, setTimeSorting] = useState(false);
  const [winsSorting, setWinsSorting] = useState(false);
  const [currentPageWinners, setCurrentPageWinners] = useState<IWinner[]>([]);

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

  const [pageTest, setPageTest] = useState(currentPageWinnersPagintion || 1);
  const changePageTestPrev = () => {
    setPageTest(pageTest > 1 ? pageTest - 1 : pageTest);
  };

  const changePageTestNext = () => {
    setPageTest(pageTest < pageCountWinnersPagination ? pageTest + 1 : pageTest);
  };

  useEffect(() => {
    dispatch(changeWinnersPaginationPage(pageTest));
  }, [dispatch, pageTest]);

  return (
    <div className="winners">
      <div className="winners__wrapper">
        <h1 className="winners__counter">
          Winners ({sortedWinners.length}) Page ({currentPageWinnersPagintion})
        </h1>
        <table width="100%" cellPadding="10" cellSpacing="1" align="center">
          <tbody>
            <tr>
              <th>№</th>
              <th>model</th>
              <th onClick={toggleWinsSortingHandler}>wins</th>
              <th onClick={toggleTimeSortingHandler}>time</th>
            </tr>
            {currentPageWinners.map(({ time, wins, color, name, numberInTable }) => {
              return (
                <tr className="winners__row" key={uuidv4()}>
                  <td>{numberInTable}</td>
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
      <div>
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

export default Winners;
