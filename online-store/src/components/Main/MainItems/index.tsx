import React from 'react';
import './style.css';
import MainItem from '../MainItem';
import { IBicycle } from '../../../models/models';

function MainItems({ bicycles }: { bicycles: IBicycle[] }) {
  return (
    <div className="main__items">
      {bicycles.map((item) => {
        return <MainItem item={item} key={Math.random()} />;
      })}
    </div>
  );
}

export default MainItems;
