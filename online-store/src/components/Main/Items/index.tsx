import React from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import Item from '../Item';
import { IBicycle } from '../../../global/models';
import Error from '../../UI/Error';

type Props = {
  bicycles: IBicycle[];
  isLoading: boolean;
};

const Items = (props: Props) => {
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
