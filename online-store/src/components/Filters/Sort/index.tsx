import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSort } from '../../../store/reducers/sort.slice';
import { options } from './constants';

function Sort() {
  const { sortOption } = useAppSelector((state) => state.sortReducer);
  const dispatch = useAppDispatch();

  function changeSortOption(value: string) {
    dispatch(setSort(value));
  }

  return (
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
  );
}

export default Sort;
