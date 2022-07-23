import React from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { FaCartPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { toggleItemToCart } from '../../../store/slices/cart/slice';
import { changeModalState } from '../../../store/slices/modal/slice';
import { ID_MODAL_CART, MAX_ITEMS_IN_CART } from '../../../global/constants';
import { ItemProps } from './models';
import { getParametersItem } from './helpers';

const Item = ({ item }: ItemProps) => {
  const dispatch = useAppDispatch();
  const { image } = item;
  const { itemsInCart } = useAppSelector(({ cartReducer }) => cartReducer);

  const isItemInCart = itemsInCart.includes(item.id);
  const paramsItem = getParametersItem(item);

  const handleAddItemToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // visibility modal
    if (!itemsInCart.includes(item.id) && itemsInCart.length === MAX_ITEMS_IN_CART) {
      dispatch(changeModalState(ID_MODAL_CART));
    } else {
      dispatch(toggleItemToCart(item.id));
    }
  };

  return (
    <div className="item" data-testid="item">
      <button
        type="button"
        className={
          isItemInCart ? 'item__button-cart item__button-cart_active' : 'item__button-cart'
        }
        data-testid="item-button"
        onClick={handleAddItemToCart}
      >
        <FaCartPlus />
      </button>
      <img className="item__image" src={image} alt="bicycle" />
      <ul className="cl.item__info">
        {paramsItem.map(({ text, value }) => {
          return (
            <li key={uuidv4()}>
              <strong>{text}:</strong> {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Item;
