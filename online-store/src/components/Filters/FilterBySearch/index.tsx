import React from 'react';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSearch } from '../../../store/slices/filterBySearch/slice';

const FilterBySearch = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector(({ searchReducer }) => searchReducer);

  const handleSetSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setSearch(value));
  };

  const handleClearSearchInput = () => {
    dispatch(setSearch(''));
  };

  return (
    <div className="input-field search" data-testid="filter-by-search">
      <label htmlFor="first_name">
        Поиск товаров:
        <input
          placeholder="Поиск"
          id="first_name"
          type="text"
          className="search__input validate"
          onChange={handleSetSearchValue}
          value={searchValue}
          autoFocus
          autoComplete="off"
        />
        <button
          type="button"
          className={searchValue.length ? 'search__clear active' : 'search__clear'}
          onClick={handleClearSearchInput}
        >
          <i className="material-icons">clear</i>
        </button>
      </label>
    </div>
  );
};

export default FilterBySearch;
