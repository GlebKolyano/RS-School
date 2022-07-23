import React from 'react';
import './style.scss';
import LocaleStorage from '../../../global/helpers/LocalStorage';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { updateStateFiltersByRange } from '../../../store/reducers/filterByRange.slice';
import { updateStateFilterBySearch } from '../../../store/reducers/filterBySearch.slice';
import { updateStateFiltersByValue } from '../../../store/reducers/filterByValue.slice';
import Button from '../../UI/Button';
import { fieldNamesForRestFilters } from './constants';

const Reset = () => {
  const dispatch = useAppDispatch();
  const Storage = new LocaleStorage();

  const handleResetFilters = () => {
    fieldNamesForRestFilters.forEach((fieldName) => {
      dispatch(updateStateFiltersByRange());
      dispatch(updateStateFiltersByValue());
      dispatch(updateStateFilterBySearch());
      Storage.remove(fieldName);
    });
  };

  const handleResetSettings = () => {
    Storage.clear();
    window.location.reload();
  };

  return (
    <div className="reset" data-testid="reset">
      <Button
        onClick={handleResetFilters}
        text="Сбросить фильтры"
        type="button"
        iconName="filter_list"
      />
      <Button
        onClick={handleResetSettings}
        text="Сбросить настройки"
        type="button"
        iconName="settings"
      />
    </div>
  );
};

export default Reset;
