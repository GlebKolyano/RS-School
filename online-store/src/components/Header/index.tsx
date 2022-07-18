import React from 'react';
import Cart from '../Cart';
import './style.scss';

function Header() {
  return (
    <header className="header" data-testid="header">
      <a href="./">
        <img src="./images/logo/logo-site.png" alt="website logo" className="header__logo" />
      </a>
      <Cart />
    </header>
  );
}

export default Header;
