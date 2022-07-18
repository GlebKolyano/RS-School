import LocaleStorage from '../global/helpers/LocalStorage';
import { IStoreInitialState } from '../global/models';
import {
  getCartItemsFromStore,
  getFiltersByRangeFromStore,
  getFiltersByValueFromStore,
  getMinMaxValuesForRangeSlider,
  getSearchFilterFromStore
} from './helpers';

const Storage = new LocaleStorage();
const sortOptionValue = Storage.get('sortSettings');
const cartStore = getCartItemsFromStore();
const searchStore = getSearchFilterFromStore();
const { storeRangePrice, storeRangeQuantity } = getFiltersByRangeFromStore();
const minMaxValues = getMinMaxValuesForRangeSlider();
const { storeColors, storeCompanies, storeTypes, storePopular } = getFiltersByValueFromStore();
const { maxPrice, minPrice, maxQuantity, minQuantity } = minMaxValues;

export const defaultValueQuantity = { min: minQuantity, max: maxQuantity };
export const defaultValuePrice = { min: minPrice, max: maxPrice };

export const INITIAL_STATE: IStoreInitialState = {
  bicycleReducer: { bicycles: [], error: '', isLoading: false },
  cartReducer: { itemsInCart: cartStore || [] },
  filterByRangeReducer: {
    filterByQuantity: storeRangeQuantity || defaultValueQuantity,
    filterByPrice: storeRangePrice || defaultValuePrice
  },
  filterByValueReducer: {
    filterByCompany: storeCompanies || [],
    filterByType: storeTypes || [],
    filterByColor: storeColors || [],
    filterByPopular: storePopular || false
  },
  modalReducer: { modalsID: {} },
  searchReducer: { searchValue: searchStore || '' },
  sortReducer: { sortOption: (sortOptionValue as string) || 'name_asc' }
};
