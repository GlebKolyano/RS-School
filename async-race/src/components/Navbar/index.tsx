import React from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/reduxHooks';

const Navbar = () => {
  const { isRaceActive } = useTypedSelector(({ raceReducer }) => raceReducer);
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
