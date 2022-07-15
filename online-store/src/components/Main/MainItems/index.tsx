import React from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import MainItem from '../MainItem';
import { IBicycle } from '../../../models/models';
import Error from '../../UI/Error';

function MainItems({ bicycles, isLoading }: { bicycles: IBicycle[]; isLoading: boolean }) {
  return (
    <div className="main__items">
      {bicycles.map((item) => {
        return <MainItem item={item} key={uuidv4()} />;
      })}
      {!bicycles.length && !isLoading && (
        <Error iconName="sentiment_very_dissatisfied" text="Ничего не найдено!" />
      )}
    </div>
  );
}

export default MainItems;
