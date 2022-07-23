import LocaleStorage from '../global/helpers/LocalStorage';
import { IStoreInitialState } from '../global/models';
import {
  getCartItemsFromStore,
  getFiltersByRangeFromStore,
  getFiltersByValueFromStore,
  getMinMaxValuesForRangeSlider,
  getSearchFilterFromStore
} from './helpers';

const sortOptionValue = LocaleStorage.get('sortSettings');
const cartStore = getCartItemsFromStore();
const searchStore = getSearchFilterFromStore();
const { storeRangePrice, storeRangeQuantity } = getFiltersByRangeFromStore();
const minMaxValues = getMinMaxValuesForRangeSlider();
const { storeColors, storeCompanies, storeTypes, storePopular } = getFiltersByValueFromStore();
const { maxPrice, minPrice, maxQuantity, minQuantity } = minMaxValues;

export const defaultValueQuantity = { min: minQuantity, max: maxQuantity };
export const defaultValuePrice = { min: minPrice, max: maxPrice };

export const INITIAL_STATE: IStoreInitialState = {
  bicycle: { bicycles: [], error: '', isLoading: false },
  cart: { itemsInCart: cartStore || [] },
  filterByRange: {
    filterByQuantity: storeRangeQuantity || defaultValueQuantity,
    filterByPrice: storeRangePrice || defaultValuePrice
  },
  filterByValue: {
    filterByCompany: storeCompanies || [],
    filterByType: storeTypes || [],
    filterByColor: storeColors || [],
    filterByPopular: storePopular || false
  },
  modal: { modalsID: {} },
  search: { searchValue: searchStore || '' },
  sort: { sortOption: (sortOptionValue as string) || 'name_asc' }
};
