import React, { useEffect } from 'react';
import './style.scss';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { fetchWinners } from '../../store/slices/winnners/slice';

function Winners() {
  const dispatch = useTypedDispatch();
  const { winners, totalWinners, error, status } = useTypedSelector(
    ({ winnersReducer }) => winnersReducer
  );

  const currentPageWinnersPagintion = 1;
  const WINNERS_PER_PAGE = 9;

  useEffect(() => {
    function getWinners() {
      const fetchData = async () => {
        const props = {
          page: currentPageWinnersPagintion,
          limit: WINNERS_PER_PAGE
        };
        await dispatch(fetchWinners(props));
      };
      fetchData().then(
        () => {},
        () => {}
      );
    }

    getWinners();
  }, [dispatch]);
  return (
    <div className="winners">
      <h1 className="winners__counter">Winners ({totalWinners})</h1>
      <div className="winners__table">
        <div className="winners__table-id column">
          <p>id</p>
          {winners.map(({ id }) => {
            return <p>{id}</p>;
          })}
        </div>
        <div className="winners__table-car column">
          <p>car</p>
        </div>
        <div className="winners__table-wins column">
          <p>wins</p>
          {winners.map(({ wins }) => {
            return <p>{wins}</p>;
          })}
        </div>
        <div className="winners__table-time column">
          <p>time</p>
          {winners.map(({ time }) => {
            return <p>{time}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Winners;
