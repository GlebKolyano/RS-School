import React from 'react';
import './style.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSearch } from '../../../store/reducers/filterBySearch.slice';

function FilterBySearch() {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.searchReducer);

  return (
    <div>
      <div className="input-field search">
        <label htmlFor="first_name">
          Поиск товаров:
          <input
            placeholder="Поиск"
            id="first_name"
            type="text"
            className="search__input validate"
            onChange={(e) => dispatch(setSearch(e.target.value))}
            value={searchValue}
            autoFocus
            autoComplete="off"
          />
        </label>
      </div>
    </div>
  );
}

export default FilterBySearch;
