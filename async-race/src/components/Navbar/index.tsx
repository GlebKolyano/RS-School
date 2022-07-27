import React from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <NavLink to="/winners">Winners</NavLink>
      <NavLink to="/">Garage</NavLink>
    </div>
  );
};

export default Navbar;
