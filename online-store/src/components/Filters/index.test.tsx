import React from 'react';
import { render } from '@testing-library/react';
import Filters from '.';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';
import { IStoreInitialState } from '../../models/models';

const FakeInitialState: IStoreInitialState = {
  bicycleReducer: { bicycles: [], error: '', isLoading: false },
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

describe('filters', () => {
  describe('correctly renders', () => {
    test('iteself', () => {
      renderWithRedux(<Filters />, FakeInitialState);
    });
  });
});
