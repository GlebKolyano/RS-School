import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { colorBicycle, companyBicycle, typeBicycle } from './constants';
import { Checkbox } from '../../UI/Checkbox';
import {
  setfilterByColor,
  setFilterByCompany,
  setfilterByPopular,
  setfilterByType
} from '../../../store/reducers/filterByValue.slice';

function FiltersByValue() {
  const { filterByType, filterByPopular, filterByColor, filterByCompany } = useAppSelector(
    (state) => state.filterByValueReducer
  );
  const dispatch = useAppDispatch();

  const handleChangeCompany = (target: HTMLInputElement) => {
    const { value: company } = target;
    dispatch(setFilterByCompany(company));
  };

  const handleChangeColor = (target: HTMLInputElement) => {
    const { value: color } = target;
    dispatch(setfilterByColor(color));
  };

  const handleChangeType = (target: HTMLInputElement) => {
    const { value: type } = target;
    dispatch(setfilterByType(type));
  };
  const handleChangeIsPopular = () => {
    dispatch(setfilterByPopular());
  };

  return (
    <div>
      <div>
        Производитель:
        <ul>
          {companyBicycle.map((item) => {
            return (
              <Checkbox
                key={item}
                name="companyBicycle"
                value={item}
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
          {typeBicycle.map((item) => {
            return (
              <Checkbox
                key={item}
                name="typeBicycle"
                value={item}
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
          {colorBicycle.map((item) => {
            return (
              <Checkbox
                key={item}
                name="colorBicycle"
                value={item}
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
            <input
              type="checkbox"
              name="popularBicycle"
              onChange={handleChangeIsPopular}
              checked={filterByPopular}
            />{' '}
            Показать популярные
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FiltersByValue;
