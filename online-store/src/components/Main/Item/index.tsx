import React from 'react';
import './style.scss';
import { FaCartPlus } from 'react-icons/fa';
import { IBicycle } from '../../../global/models';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { toggleItemToCart } from '../../../store/reducers/cart.slice';
import { changeModalState } from '../../../store/reducers/modal.slice';
import { ID_MODAL_CART, MAX_ITEMS_IN_CART } from '../../../global/constants';

const Item = ({ item }: { item: IBicycle }) => {
  const dispatch = useAppDispatch();
  const { brand, name, speeds, weight, quantity, color, price, isPopular, image } = item;
  const { itemsInCart } = useAppSelector((state) => state.cartReducer);
  const isItemInCart = itemsInCart.includes(item.id);

  const handleAddItemToCart = (event: React.MouseEvent<HTMLButtonElement>, product: IBicycle) => {
    event.preventDefault();

    // visibility modal
    if (!itemsInCart.includes(product.id) && itemsInCart.length === MAX_ITEMS_IN_CART) {
      dispatch(changeModalState(ID_MODAL_CART));
    } else {
      dispatch(toggleItemToCart(product.id));
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
        onClick={(e) => handleAddItemToCart(e, item)}
      >
        <FaCartPlus />
      </button>
      <img className="item__image" src={image} alt="bicycle" />
      <ul className="cl.item__info">
        <li>
          <strong>Название:</strong> {name}
        </li>
        <li>
          <strong>Брэнд:</strong> {brand}
        </li>
        <li>
          <strong>Цвет:</strong> {color}
        </li>
        <li>
          <strong>Количество скоростей:</strong> {speeds}{' '}
        </li>
        <li>
          <strong>Количество:</strong> {quantity}{' '}
        </li>
        <li>
          <strong>Вес:</strong> {weight}{' '}
        </li>
        <li>
          <strong>Цена:</strong> {price}₽{' '}
        </li>
        <li>
          <strong>Популярный:</strong> {isPopular ? 'да' : 'нет'}
        </li>
      </ul>
    </div>
  );
};

export default Item;
