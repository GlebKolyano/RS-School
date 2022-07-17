import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './tests/helpers/renderWithRedux';
import { FakeInitialState } from './tests/contatns';
import App from './App';

describe('App', () => {
  test('renders itself', () => {
    renderWithRedux(<App />, FakeInitialState);
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
