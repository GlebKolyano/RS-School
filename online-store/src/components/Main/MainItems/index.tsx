import React from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import MainItem from '../MainItem';
import { IBicycle } from '../../../models/models';

function MainItems({ bicycles }: { bicycles: IBicycle[] }) {
  return (
    <div className="main__items">
      {bicycles.map((item) => {
        return <MainItem item={item} key={uuidv4()} />;
      })}
    </div>
  );
}

export default MainItems;
