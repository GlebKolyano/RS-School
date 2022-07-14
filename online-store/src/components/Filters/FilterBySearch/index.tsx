import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSearch } from '../../../store/reducers/filterBySearch.slice';

function FilterBySearch() {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.searchReducer);

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск"
        onChange={(e) => dispatch(setSearch(e.target.value))}
        value={searchValue}
        autoFocus
      />
    </div>
  );
}

export default FilterBySearch;
