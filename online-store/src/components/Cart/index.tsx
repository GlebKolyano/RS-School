import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { useAppSelector } from '../../hooks/reduxHooks';
import './style.css';

function Cart() {
  const { itemsInCart } = useAppSelector((state) => state.cartReducer);
  const quantityItemsInCart = itemsInCart.length;

  return (
    <div className="cart" data-testid="cart">
      <div className="cart__wrapper">
        <FaShoppingBag className="cart__icon" />
        <span className="cart__counter" data-testid="cart-counter">
          {quantityItemsInCart}
        </span>
      </div>
    </div>
  );
}

export default Cart;
