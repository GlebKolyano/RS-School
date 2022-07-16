import LocaleStorage from '../../global/helpers/LocalStorage';
import { IFilterByRangeInitialState, IFilterByValueInitialState } from '../../models/models';
import DATA from '../../data/data';

const Storage = new LocaleStorage();

export function getMinMaxValuesForRangeSlider() {
  const bicycles = DATA;
  const minQuantity = bicycles.reduce(
    (res, item) => (res > item.quantity ? item.quantity : res),
    Infinity
  );
  const maxQuantity = bicycles.reduce(
    (res, item) => (res < item.quantity ? item.quantity : res),
    0
  );
  const minPrice = bicycles.reduce((res, item) => (res > item.price ? item.price : res), Infinity);
  const maxPrice = bicycles.reduce((res, item) => (res < item.price ? item.price : res), 0);

  return { minQuantity, maxQuantity, minPrice, maxPrice };
}

export function getFiltersByValueFromStore() {
  const storeFilters = Storage.get('filterByValueSettings') as IFilterByValueInitialState;

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

export function getFiltersByRangeFromStore() {
  const storeFilters = Storage.get('filterByRangeSettings') as IFilterByRangeInitialState;

  let storeRangePrice;
  if (storeFilters) {
    storeRangePrice = storeFilters.filterByPrice;
  }
  let storeRangeQuantity;
  if (storeFilters) {
    storeRangeQuantity = storeFilters.filterByQuantity;
  }

  return {
    storeRangePrice,
    storeRangeQuantity
  };
}

export function getCartItemsFromStore() {
  const storeFilters = Storage.get('cartItems') as number[];
  return storeFilters;
}
