import React from 'react';
import './style.scss';
import LocaleStorage from '../../../global/helpers/LocalStorage';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { updateStateFiltersByRange } from '../../../store/slices/filterByRange/slice';
import { updateStateFilterBySearch } from '../../../store/slices/filterBySearch/slice';
import { updateStateFiltersByValue } from '../../../store/slices/filterByValue/slice';
import Button from '../../UI/Button';
import {
  fieldNamesForRestFilters,
  FILTERS_RESET_BTN_TEXT,
  SETTINGS_RESET_BTN_TEXT
} from './constants';

const Reset = () => {
  const dispatch = useAppDispatch();

  const handleResetFilters = () => {
    fieldNamesForRestFilters.forEach((fieldName) => {
      dispatch(updateStateFiltersByRange());
      dispatch(updateStateFiltersByValue());
      dispatch(updateStateFilterBySearch());
      LocaleStorage.remove(fieldName);
    });
  };

  const handleResetSettings = () => {
    LocaleStorage.clear();
    window.location.reload();
  };

  return (
    <div className="reset" data-testid="reset">
      <Button
        onClick={handleResetFilters}
        text={FILTERS_RESET_BTN_TEXT}
        type="button"
        iconName="filter_list"
      />
      <Button
        onClick={handleResetSettings}
        text={SETTINGS_RESET_BTN_TEXT}
        type="button"
        iconName="settings"
      />
    </div>
  );
};

export default Reset;
