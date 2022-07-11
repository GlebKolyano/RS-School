import React from 'react';
import './style.css';
import Filters from '../Filters';
import MainItems from './MainItems';

function Main() {
  return (
    <div className="main">
      <Filters />
      <MainItems />
    </div>
  );
}

export default Main;
