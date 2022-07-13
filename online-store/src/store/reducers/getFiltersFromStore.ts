import LocaleStorage from '../../helpers/LocaleStorage';
import { IFilterByValueSlice } from '../../models/models';

const Storage = new LocaleStorage();
export function getFiltersByValueFromStore() {
  const storeFilters = Storage.get('filterByValueSettings') as IFilterByValueSlice;

  let storeTypes;
  if (storeFilters) {
    storeTypes = storeFilters.filterByType ? storeFilters.filterByType : null;
  }
  let storeCompanies;
  if (storeFilters) {
    storeCompanies = storeFilters.filterByCompany ? storeFilters.filterByCompany : null;
  }
  let storeColors;
  if (storeFilters) {
    storeColors = storeFilters.filterByColor ? storeFilters.filterByColor : null;
  }
  let storePopular;
  if (storeFilters) {
    storePopular = storeFilters.filterByPopular ? storeFilters.filterByPopular : null;
  }

  return {
    storeTypes,
    storeCompanies,
    storeColors,
    storePopular
  };
}

export function getSearchFilterFromStore() {
  const storeFilters = Storage.get('filterBySearchSettings');

  return storeFilters ? (storeFilters as string) : null;
}
