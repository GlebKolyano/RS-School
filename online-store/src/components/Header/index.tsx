import React from 'react';
import Cart from '../Cart';
import './style.scss';

function Header() {
  return (
    <div className="header">
      <a href="./">
        {/* <FaBicycle className="header__logo" /> */}
        <img src="./images/logo/logo-site.png" alt="logo of site" className="header__logo" />
      </a>
      <Cart />
    </div>
  );
}

export default Header;
