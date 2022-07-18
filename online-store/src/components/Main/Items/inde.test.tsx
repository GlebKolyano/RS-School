import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../../tests/helpers/renderWithRedux';
import {
  fakeData,
  fakeEmptyData,
  FakeInitialState,
  QUANTITY_PRODUCTS
} from '../../../tests/contatns';
import Items from '.';

describe('items', () => {
  test('renders itself with data without filters', async () => {
    renderWithRedux(<Items bicycles={fakeData} isLoading={false} />, FakeInitialState);

    const itemsElem = screen.getByTestId('items');
    expect(itemsElem).toBeInTheDocument();

    const items = await screen.findAllByTestId('item');
    expect(items.length).toEqual(QUANTITY_PRODUCTS);
  });

  test('return error when data is empty', () => {
    renderWithRedux(<Items bicycles={fakeEmptyData} isLoading={false} />, FakeInitialState);

    const items = screen.queryAllByTestId('item');
    expect(items.length).toEqual(0);

    const errorElem = screen.getByTestId('error');
    expect(errorElem).toBeInTheDocument();
  });
});
