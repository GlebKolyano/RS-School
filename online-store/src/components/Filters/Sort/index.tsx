import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSort } from '../../../store/reducers/sort.slice';
import { options } from './constants';

const Sort = () => {
  const { sortOption } = useAppSelector(({ sortReducer }) => sortReducer);
  const dispatch = useAppDispatch();

  function changeSortOption(value: string) {
    dispatch(setSort(value));
  }

  return (
    <div data-testid="sort">
      <select
        className="browser-default"
        onChange={(e) => changeSortOption(e.target.value)}
        defaultValue={sortOption}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Sort;
