import React from 'react';
import cl from './style.module.css';
import { IBicycle } from '../../../models/models';

function MainItem({ item }: { item: IBicycle }) {
  const { brand, name, speeds, weight, quantity, image } = item;
  const rootClass = [cl.item, 'z-depth-1'].join(' ');
  return (
    <div className={rootClass}>
      <img className={cl.item__image} src={image} alt="img" />
      <ul className={cl.item__info}>
        <li>Название: {name}</li>
        <li>Брэнд: {brand}</li>
        <li>Количество скоростей: {speeds} </li>
        <li>Количество: {quantity} </li>
        <li>Вес: {weight} </li>
      </ul>
    </div>
  );
}

export default MainItem;
