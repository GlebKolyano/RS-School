import { IBicycle, IStoreInitialState } from '../global/models';

export const fakeEmptyData: IBicycle[] = [];

export const fakeData: IBicycle[] = [
  {
    id: 1,
    name: 'Велосипед Storm 2.0',
    quantity: 99,
    type: 'Горный',
    brand: 'Denton',
    speeds: 18,
    color: 'серый',
    weight: 16,
    isPopular: false,
    inBasket: false,
    image: './images/53609200299.jpg',
    price: 14039
  },
  {
    id: 2,
    name: 'Велосипед Storm 3.0',
    quantity: 76,
    type: 'Горный',
    brand: 'Denton',
    speeds: 21,
    color: 'черный',
    weight: 16,
    isPopular: false,
    inBasket: false,
    image: './images/53609210299.jpg',
    price: 15729
  },
  {
    id: 3,
    name: 'Велосипед Storm 3.0 Sport',
    quantity: 37,
    type: 'Горный',
    brand: 'Denton',
    speeds: 21,
    color: 'зеленый',
    weight: 17,
    isPopular: true,
    inBasket: false,
    image: './images/61735150299.jpg',
    price: 16169
  },
  {
    id: 4,
    name: 'Электровелосипед XT 600 D',
    quantity: 64,
    type: 'Электровелосипед',
    brand: 'Eltreco',
    speeds: 7,
    color: 'зеленый',
    weight: 26,
    isPopular: true,
    inBasket: false,
    image: './images/57992510299.jpg',
    price: 57519
  },
  {
    id: 5,
    name: 'Велосипед Storm 1.0',
    quantity: 10,
    type: 'Горный',
    brand: 'Denton',
    speeds: 6,
    color: 'черный',
    weight: 14.3,
    isPopular: false,
    inBasket: false,
    image: './images/53609240299.jpg',
    price: 13649
  },
  {
    id: 6,
    name: 'Велосипед Talon 3',
    quantity: 88,
    type: 'Горный',
    brand: 'Giant',
    speeds: 16,
    color: 'серый',
    weight: 14.3,
    isPopular: false,
    inBasket: false,
    image: './images/65967270299.jpg',
    price: 62999
  }
];

export const FakeInitialState: IStoreInitialState = {
  bicycleReducer: {
    bicycles: fakeData,
    error: '',
    isLoading: false
  },
  cartReducer: { itemsInCart: [] },
  filterByRangeReducer: {
    filterByPrice: { min: 0, max: 100 },
    filterByQuantity: { min: 0, max: 100 }
  },
  filterByValueReducer: {
    filterByColor: [],
    filterByCompany: [],
    filterByPopular: false,
    filterByType: []
  },
  modalReducer: { modalsID: {} },
  searchReducer: { searchValue: '' },
  sortReducer: { sortOption: '' }
};

export const QUANTITY_PRODUCTS = fakeData.length;
