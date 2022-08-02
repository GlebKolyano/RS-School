import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSort } from '../../../store/slices/sort/slice';
import { options } from './constants';

const Sort = () => {
  const { sortOption } = useAppSelector(({ sortReducer }) => sortReducer);
  const dispatch = useAppDispatch();

  const changeSortOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    dispatch(setSort(value));
  };

  return (
    <div data-testid="sort">
      <select className="browser-default" onChange={changeSortOption} defaultValue={sortOption}>
        {options.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Sort;
