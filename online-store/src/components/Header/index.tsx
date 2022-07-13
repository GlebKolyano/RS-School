import React from 'react';
import { FaBicycle } from 'react-icons/fa';
import Cart from '../Cart';
import './style.css';

function Header() {
  return (
    <div className="header">
      <a href="./">
        <FaBicycle className="header__logo" />
      </a>
      <Cart />
    </div>
  );
}

export default Header;
