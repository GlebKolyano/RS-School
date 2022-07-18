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

  // test('correctly work adding to cart by click button', async () => {
  //   renderWithRedux(<App />, FakeInitialState);

  //   const itemButtons = await screen.findAllByTestId('item-button');
  //   const addItemToCartBtn = itemButtons[0];

  //   expect(screen.getByTestId('cart')).toBeInTheDocument();
  //   expect(addItemToCartBtn).toBeInTheDocument();

  //   const counterItemsInCart = screen.getByTestId('cart-counter');

  //   expect(counterItemsInCart).toBeInTheDocument();
  //   expect(counterItemsInCart).toHaveTextContent('0');

  //   userEvent.click(addItemToCartBtn);
  //   expect(counterItemsInCart).toHaveTextContent('1');
  // });
});
