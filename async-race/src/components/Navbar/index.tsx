import React from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import { useRaceSelector } from '../../store/selectors';

const Navbar = () => {
  const { isRaceActive } = useRaceSelector();
  return (
    <div className="navigation">
      <NavLink to="/" className="navigation__link">
        Garage
      </NavLink>
      <NavLink
        to="/winners"
        className={isRaceActive ? 'navigation__link disabled' : 'navigation__link'}
      >
        Winners
      </NavLink>
    </div>
  );
};

export default Navbar;
