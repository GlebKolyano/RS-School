import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBySearch from '.';
import { FakeInitialState } from '../../../tests/contatns';
import { renderWithRedux } from '../../../tests/helpers/renderWithRedux';

describe('filterBySearch', () => {
  test('correctly renders iteself', () => {
    renderWithRedux(<FilterBySearch />, FakeInitialState);
    const filterBySearchComponent = screen.getByTestId('filter-by-search');
    expect(filterBySearchComponent).toBeInTheDocument();
  });

  test('correctly works search input event', () => {
    renderWithRedux(<FilterBySearch />, FakeInitialState);
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveTextContent('');

    const inputTextByUser = 'text';
    userEvent.type(searchInput, inputTextByUser);

    expect(screen.getByRole('textbox')).toContainHTML(inputTextByUser);
  });

  test('correctly works clearing of input when button is clicked', () => {
    renderWithRedux(<FilterBySearch />, FakeInitialState);
    const searchInput = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    const inputTextByUser = 'some text';

    expect(searchInput).toHaveTextContent('');
    expect(button).toHaveTextContent(/clear/i);

    userEvent.type(searchInput, inputTextByUser);
    userEvent.click(button);

    expect(screen.getByRole('textbox')).toContainHTML('');
  });

  test('on loading page the input is focused', () => {
    renderWithRedux(<FilterBySearch />, FakeInitialState);
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveFocus();
  });
});
