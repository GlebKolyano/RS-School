import React from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { ItemsProps } from './models';
import Item from '../Item';
import Error from '../../UI/Error';

const Items = (props: ItemsProps) => {
  const { bicycles, isLoading } = props;

  return (
    <div className="items" data-testid="items">
      {bicycles.map((item) => {
        return <Item item={item} key={uuidv4()} />;
      })}
      {!bicycles.length && !isLoading && (
        <Error iconName="sentiment_very_dissatisfied" text="Ничего не найдено!" />
      )}
    </div>
  );
};

export default Items;
