import React from 'react';
import FilterBySearch from './FilterBySearch';
import FiltersByRange from './FiltersByRange';
import FiltersByValue from './FiltersByValue';
import Reset from './Reset';
import Sort from './Sort';
import './style.scss';

function Filters() {
  return (
    <div className="filters" data-testid="filters">
      <FilterBySearch />
      <Sort />
      <FiltersByValue />
      <FiltersByRange />
      <Reset />
    </div>
  );
}

export default Filters;
