import React from 'react';
import FilterBySearch from './FilterBySearch';
import FilterByRange from './FiltersByRange';
import FiltersByValue from './FiltersByValue';
import Reset from './Reset';
import Sort from './Sort';
import './style.css';

function Filters() {
  return (
    <div className="filters">
      Filters
      <FilterBySearch />
      <Sort />
      <FiltersByValue />
      <FilterByRange />
      <Reset />
    </div>
  );
}

export default Filters;
