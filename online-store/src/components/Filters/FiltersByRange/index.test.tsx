import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { FakeInitialState } from '../../../tests/contatns';
import { renderWithRedux } from '../../../tests/helpers/renderWithRedux';
import FilterByRange from '.';

describe('filterByrange', () => {
  test('correctly render itself', () => {
    renderWithRedux(<FilterByRange />, FakeInitialState);
    const filterByRangeComponent = screen.getByTestId('filter-by-range');
    expect(filterByRangeComponent).toBeInTheDocument();
  });

  test('correctly renders 2 sliders', () => {
    renderWithRedux(<FilterByRange />, FakeInitialState);
    const filterByRangeComponent = screen.getByTestId('filter-by-range');

    expect(filterByRangeComponent).toHaveTextContent(/Количество на складе:/);
    expect(filterByRangeComponent).toHaveTextContent(/По цене:/);
  });
});
