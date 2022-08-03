import React, { useEffect } from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch, useTypedSelector } from '../../hooks/reduxHooks';
import { ReactComponent as CarModel } from '../../assets/car.svg';
import { getWinners } from '../../store/slices/winnners/slice';

function Winners() {
  const dispatch = useTypedDispatch();
  const { winners, totalWinners } = useTypedSelector(({ winnersReducer }) => winnersReducer);

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
      <table width="100%" cellPadding="10" cellSpacing="1" align="center">
        <tbody>
          <tr>
            <th>№</th>
            <th>model</th>
            <th>wins</th>
            <th>time</th>
          </tr>
          {winners.map(({ time, wins, color, name }, indexWinner) => {
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
  );
}

export default Winners;
