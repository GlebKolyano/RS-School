import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import './style.css';

function Cart() {
  return (
    <div className="cart">
      <div className="cart__wrapper">
        <FaShoppingBag className="cart__icon" />
        <span className="cart__counter">20</span>
      </div>
    </div>
  );
}

export default Cart;
