import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSearch } from '../../../store/reducers/search.slice';

function FilterBySearch() {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  function changeSearchValue(value: string): void {
    dispatch(setSearch(value));
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Поиск"
        onChange={(e) => changeSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
}

export default FilterBySearch;
