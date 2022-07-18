import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';
import { FakeInitialState } from '../../tests/contatns';
import Footer from '.';

describe('footer', () => {
  test('renders itself', () => {
    renderWithRedux(<Footer />, FakeInitialState);
    const footerElem = screen.getByTestId('footer');
    expect(footerElem).toBeInTheDocument();
  });

  test('renders links', () => {
    renderWithRedux(<Footer />, FakeInitialState);
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(3);
  });

  test('footer snapshot', () => {
    renderWithRedux(<Footer />, FakeInitialState);
    const footerElem = screen.getByTestId('footer');
    expect(footerElem).toMatchSnapshot();
  });
});
