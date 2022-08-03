import React, { useEffect } from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { getWinners } from '../../store/slices/winnners/slice';
import { IWinner } from '../../global/models';

function Winners() {
  const dispatch = useTypedDispatch();
  const { winners, totalWinners } = useTypedSelector(({ winnersReducer }) => winnersReducer);

  const winnnersForRender = winners;

  const currentPageWinnersPagintion = 1;
  const WINNERS_PER_PAGE = 9;

  useEffect(
    function fetchWinners() {
      (async () => {
        const props = {
          page: currentPageWinnersPagintion,
          limit: WINNERS_PER_PAGE
        };
        await dispatch(getWinners(props));
      })().catch(() => {});
    },
    [dispatch]
  );

  return (
    <div className="winners">
      <h1 className="winners__counter">Winners ({totalWinners})</h1>
      <div className="winners__table">
        <div className="winner__row">
          <span>№</span>
          <span>model</span>
          <span>wins</span>
          <span>time</span>
        </div>
        {winnnersForRender.map((winner) => {
          return <p key={uuidv4()}>{winner.id}</p>;
        })}
        {/* <div className="winners__table">
          <p>№</p>
          {winners.map(({ id }) => {
            return <p key={uuidv4()}>{id}</p>;
          })}
        </div>
        <div className="winners__table-car column">
          <p>car</p>
        </div>
        <div className="winners__table-wins column">
          <p>wins</p>
          {winners.map(({ wins }) => {
            return <p key={uuidv4()}>{wins}</p>;
          })}
        </div>
        <div className="winners__table-time column">
          <p>time</p>
          {winners.map(({ time }) => {
            return <p key={uuidv4()}>{time}</p>;
          })}
        </div> */}
      </div>
    </div>
  );
}

export default Winners;
