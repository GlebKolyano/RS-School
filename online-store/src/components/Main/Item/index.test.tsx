import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../../tests/helpers/renderWithRedux';
import { fakeData, FakeInitialState } from '../../../tests/contatns';
import Item from '.';

describe('Item', () => {
  test('renders itself', () => {
    renderWithRedux(<Item item={fakeData[0]} />, FakeInitialState);
    expect(screen.getByTestId('item')).toBeInTheDocument();
    expect(screen.getByAltText('bicycle')).toBeInTheDocument();
    expect(screen.getByText(/Название/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
