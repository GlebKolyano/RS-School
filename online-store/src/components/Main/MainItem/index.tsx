import React from 'react';
import './style.css';
import { FaCartPlus } from 'react-icons/fa';
import { IBicycle } from '../../../models/models';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { toggleItemToCart } from '../../../store/reducers/cart.slice';
import { ID_MODAL_CART, MAX_ITEMS_IN_CART } from '../../../constants/constants';
import { changeModalState } from '../../../store/reducers/modal.slice';

function MainItem({ item }: { item: IBicycle }) {
  const dispatch = useAppDispatch();
  const { brand, name, speeds, weight, quantity, color, price, isPopular, image } = item;
  const { itemsInCart } = useAppSelector((state) => state.cartReducer);
  const isItemInCart = itemsInCart.includes(item.id);

  const handleAddItemToCart = (event: React.MouseEvent<HTMLButtonElement>, product: IBicycle) => {
    event.preventDefault();
    if (!itemsInCart.includes(product.id) && itemsInCart.length === MAX_ITEMS_IN_CART) {
      dispatch(changeModalState(ID_MODAL_CART));
    } else {
      dispatch(toggleItemToCart(product.id));
    }
  };

  return (
    <div className={isItemInCart ? 'item item_inCart' : 'item'}>
      <button type="button" className="item__cart" onClick={(e) => handleAddItemToCart(e, item)}>
        <FaCartPlus />
      </button>
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
