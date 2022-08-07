import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IWinner, SortingTypes } from '../../../global/models';
import { useTypedDispatch } from '../../../hooks/reduxHooks';
import { changeSortingType } from '../../../store/slices/winnner/slice';
import { ReactComponent as CarModel } from '../../../assets/car.svg';

const WinnersTable = ({ winners }: { winners: IWinner[] }) => {
  const dispatch = useTypedDispatch();
  const [timeSorting, setTimeSorting] = useState(false);
  const [winsSorting, setWinsSorting] = useState(false);

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
    <table width="100%" cellPadding="10" cellSpacing="1" align="center">
      <tbody>
        <tr>
          <th>№</th>
          <th>model</th>
          <th onClick={toggleWinsSortingHandler}>wins</th>
          <th onClick={toggleTimeSortingHandler}>time</th>
        </tr>
        {winners.map(({ time, wins, color, name, numberInTable }) => {
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
  );
};

export default WinnersTable;
