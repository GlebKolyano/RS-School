import React from 'react';
import LocaleStorage from '../../../helpers/LocaleStorage';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { updateStateFiltersByRange } from '../../../store/reducers/filterByRange.slice';
import { updateStateFiltersByValue } from '../../../store/reducers/filterByValue.slice';
import { fieldNamesForRestFilters } from './constants';

function Reset() {
  const dispatch = useAppDispatch();
  const Storage = new LocaleStorage();

  const handleResetFilters = () => {
    fieldNamesForRestFilters.forEach((fieldName) => {
      dispatch(updateStateFiltersByRange());
      dispatch(updateStateFiltersByValue());
      Storage.remove(fieldName);
    });
  };

  const handleResetSettings = () => {
    Storage.clear();
    window.location.reload();
  };

  return (
    <div>
      <button type="button" onClick={handleResetFilters}>
        Сбросить фильтры
      </button>
      <button type="button" onClick={handleResetSettings}>
        Сбросить настройки
      </button>
    </div>
  );
}

export default Reset;
