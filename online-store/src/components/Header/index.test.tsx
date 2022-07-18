import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';
import { FakeInitialState } from '../../tests/contatns';
import Header from '.';

describe('header', () => {
  test('renders itself', () => {
    renderWithRedux(<Header />, FakeInitialState);
    const headerElem = screen.getByTestId('header');
    expect(headerElem).toBeInTheDocument();
  });

  test('renders logo and cart', () => {
    renderWithRedux(<Header />, FakeInitialState);
    expect(screen.getByAltText('website logo')).toBeInTheDocument();
    expect(screen.getByTestId('cart')).toBeInTheDocument();
  });

  test('header snapshot', () => {
    renderWithRedux(<Header />, FakeInitialState);
    const headerElem = screen.getByTestId('header');
    expect(headerElem).toMatchSnapshot();
  });
});
