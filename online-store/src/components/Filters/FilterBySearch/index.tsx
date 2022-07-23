import React from 'react';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSearch } from '../../../store/reducers/filterBySearch.slice';

const FilterBySearch = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.searchReducer);

  return (
    <div className="input-field search" data-testid="filter-by-search">
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
        <button
          type="button"
          className={searchValue.length ? 'search__clear active' : 'search__clear'}
          onClick={() => dispatch(setSearch(''))}
        >
          <i className="material-icons">clear</i>
        </button>
      </label>
    </div>
  );
};

export default FilterBySearch;
