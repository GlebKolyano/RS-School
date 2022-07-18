import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';
import { FakeInitialState } from '../../tests/contatns';
import Main from '.';

describe('Main', () => {
  test('renders itself', () => {
    renderWithRedux(<Main />, FakeInitialState);
    const mainComponent = screen.getByTestId('main');
    expect(mainComponent).toBeInTheDocument();
  });

  test('renders loader while items is loading', () => {
    renderWithRedux(<Main />, FakeInitialState);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
