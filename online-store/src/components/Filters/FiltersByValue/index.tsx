import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { colorBicycle, companyBicycle, typeBicycle } from './constants';
import Checkbox from '../../UI/Checkbox';
import {
  setfilterByColor,
  setFilterByCompany,
  setfilterByPopular,
  setfilterByType
} from '../../../store/reducers/filterByValue.slice';

const FiltersByValue = () => {
  const { filterByType, filterByPopular, filterByColor, filterByCompany } = useAppSelector(
    ({ filterByValueReducer }) => filterByValueReducer
  );
  const dispatch = useAppDispatch();

  const handleChangeCompany = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: company } = e.target;
    dispatch(setFilterByCompany(company));
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: color } = e.target;
    dispatch(setfilterByColor(color));
  };

  const handleChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: type } = e.target;
    dispatch(setfilterByType(type));
  };
  const handleChangeIsPopular = () => {
    dispatch(setfilterByPopular());
  };

  return (
    <div data-testid="filter-by-value">
      <div>
        Производитель:
        <ul>
          {companyBicycle.map(({ company, nameCheckbox }) => {
            return (
              <Checkbox
                key={company}
                name={nameCheckbox}
                value={company}
                onChange={handleChangeCompany}
                state={filterByCompany}
              />
            );
          })}
        </ul>
      </div>
      <div>
        Тип велосипеда:
        <ul>
          {typeBicycle.map(({ type, nameCheckbox }) => {
            return (
              <Checkbox
                key={type}
                name={nameCheckbox}
                value={type}
                onChange={handleChangeType}
                state={filterByType}
              />
            );
          })}
        </ul>
      </div>
      <div>
        Цвет:
        <ul>
          {colorBicycle.map(({ color, nameCheckbox }) => {
            return (
              <Checkbox
                key={color}
                name={nameCheckbox}
                value={color}
                onChange={handleChangeColor}
                state={filterByColor}
              />
            );
          })}
        </ul>
      </div>
      <div>
        Только популярные:
        <ul>
          <li>
            <label htmlFor="popularIdCheckbox">
              <input
                className="filled-in"
                id="popularIdCheckbox"
                type="checkbox"
                name="popularBicycle"
                onChange={handleChangeIsPopular}
                checked={filterByPopular}
              />
              <span>Показать популярные</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FiltersByValue;
