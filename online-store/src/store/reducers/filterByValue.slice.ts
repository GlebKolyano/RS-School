import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LocaleStorage from '../../global/helpers/LocalStorage';
import { IFilterByValueInitialState } from '../../global/models';

const Storage = new LocaleStorage();

const initialState: IFilterByValueInitialState = {
  filterByCompany: [],
  filterByType: [],
  filterByColor: [],
  filterByPopular: false
};

export const filterByValue = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setFilterByCompany: (state, { payload }: PayloadAction<string>) => {
      const { filterByCompany } = state;
      const filterValue = payload;

      if (filterByCompany.includes(filterValue)) {
        const indexDeletedElement = filterByCompany.indexOf(filterValue);
        filterByCompany.splice(indexDeletedElement, 1);
      } else {
        filterByCompany.push(payload);
      }

      Storage.set('filterByValueSettings', state);
    },
    setfilterByType: (state, { payload }: PayloadAction<string>) => {
      const { filterByType } = state;
      const filterValue = payload;

      if (filterByType.includes(filterValue)) {
        const indexDeletedElement = filterByType.indexOf(filterValue);
        filterByType.splice(indexDeletedElement, 1);
      } else {
        filterByType.push(payload);
      }

      Storage.set('filterByValueSettings', state);
    },
    setfilterByColor: (state, { payload }: PayloadAction<string>) => {
      const { filterByColor } = state;
      const filterValue = payload;

      if (filterByColor.includes(filterValue)) {
        const indexDeletedElement = filterByColor.indexOf(filterValue);
        filterByColor.splice(indexDeletedElement, 1);
      } else {
        filterByColor.push(payload);
      }

      Storage.set('filterByValueSettings', state);
    },
    setfilterByPopular: (state) => {
      const stateVar = state;
      stateVar.filterByPopular = !stateVar.filterByPopular;
      Storage.set('filterByValueSettings', state);
    },
    updateStateFiltersByValue: (state) => {
      const stateVar = state;
      stateVar.filterByColor = [];
      stateVar.filterByCompany = [];
      stateVar.filterByType = [];
      stateVar.filterByPopular = false;
      Storage.set('filterByValueSettings', stateVar);
    }
  }
});

export const {
  setFilterByCompany,
  setfilterByType,
  setfilterByColor,
  setfilterByPopular,
  updateStateFiltersByValue
} = filterByValue.actions;
export const filterByValueReducer = filterByValue.reducer;
