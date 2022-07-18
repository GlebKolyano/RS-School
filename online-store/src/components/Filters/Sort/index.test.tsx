import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FakeInitialState } from '../../../tests/contatns';
import { renderWithRedux } from '../../../tests/helpers/renderWithRedux';
import Sort from '.';

describe('sort', () => {
  test('renders inself', () => {
    renderWithRedux(<Sort />, FakeInitialState);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    userEvent.selectOptions(select, 'name_asc');
    expect(screen.getByText(/По названию, от А до Я/i)).toBeTruthy();
  });

  test('renders options', () => {
    renderWithRedux(<Sort />, FakeInitialState);
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
  });
});
