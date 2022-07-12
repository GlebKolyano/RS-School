import React from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setSort } from '../../../store/reducers/sort.slice';
import { options } from './constants';

function Sort() {
  const dispatch = useAppDispatch();

  function changeSortOption(value: string) {
    dispatch(setSort(value));
  }

  return (
    <select className="browser-default" onChange={(e) => changeSortOption(e.target.value)}>
      {options.map((option) => {
        return <option value={option.value}>{option.label}</option>;
      })}
    </select>
  );
}

export default Sort;
