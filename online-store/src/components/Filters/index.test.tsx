import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import Filters from '.';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';
import { FakeInitialState } from '../../tests/contatns';

describe('filters', () => {
  test('renders itself', () => {
    renderWithRedux(<Filters />, FakeInitialState);
    const filtersElem = screen.getByTestId('filters');
    expect(filtersElem).toBeInTheDocument();
  });
});
