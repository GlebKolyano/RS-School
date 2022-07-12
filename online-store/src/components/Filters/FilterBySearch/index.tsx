import React from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setSearch } from '../../../store/reducers/search.slice';

function FilterBySearch() {
  const dispatch = useAppDispatch();

  function changeSearchValue(value: string): void {
    dispatch(setSearch(value));
  }

  return (
    <div>
      <input type="text" placeholder="Поиск" onChange={(e) => changeSearchValue(e.target.value)} />
    </div>
  );
}

export default FilterBySearch;
