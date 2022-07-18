import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { FakeInitialState } from '../../../tests/contatns';
import { renderWithRedux } from '../../../tests/helpers/renderWithRedux';
import FiltersByValue from '.';

describe('filtersByValue', () => {
  test('renders itself', () => {
    renderWithRedux(<FiltersByValue />, FakeInitialState);
    const filtersByValueElem = screen.getByTestId('filter-by-value');
    expect(filtersByValueElem).toBeInTheDocument();
  });

  test('renders checkboxes', () => {
    renderWithRedux(<FiltersByValue />, FakeInitialState);
    expect(screen.getByText(/производитель/i)).toBeInTheDocument();
    expect(screen.getByText(/тип велосипеда/i)).toBeInTheDocument();
    expect(screen.getByText(/цвет/i)).toBeInTheDocument();
    expect(screen.getByText(/только популярные/i)).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });
});
