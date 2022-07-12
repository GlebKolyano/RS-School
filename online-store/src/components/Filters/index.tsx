import React from 'react';
import FilterBySearch from './FilterBySearch';
import Sort from './Sort';
import './style.css';

function Filters() {
  return (
    <div className="filters">
      Filters
      <FilterBySearch />
      <Sort />
    </div>
  );
}

export default Filters;
