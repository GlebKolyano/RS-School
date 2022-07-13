import React from 'react';
import './style.css';
import { IBicycle } from '../../../models/models';

function MainItem({ item }: { item: IBicycle }) {
  const { brand, name, speeds, weight, quantity, color, price, isPopular, image } = item;
  const rootClass = `item + z-depth-1`;
  return (
    <div className={rootClass}>
      <img className="item__image" src={image} alt="img" />
      <ul className="cl.item__info">
        <li>Название: {name}</li>
        <li>Брэнд: {brand}</li>
        <li>Цвет: {color}</li>
        <li>Количество скоростей: {speeds} </li>
        <li>Количество: {quantity} </li>
        <li>Вес: {weight} </li>
        <li>Цена: {price}₽ </li>
        <li>Популярный: {isPopular ? 'да' : 'нет'}</li>
      </ul>
    </div>
  );
}

export default MainItem;
