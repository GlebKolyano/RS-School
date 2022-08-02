import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { FakeInitialState } from '../../../tests/contatns';
import { renderWithRedux } from '../../../tests/helpers/renderWithRedux';
import Checkbox from '.';

describe('filtersByValue', () => {
  test('renders itself', () => {
    const handleChange = jest.fn();

    renderWithRedux(
      <Checkbox name="text" value="text" onChange={handleChange} />,
      FakeInitialState
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('correctly works checkbox click', () => {
    const handleChange = jest.fn();

    renderWithRedux(
      <Checkbox name="text" value="text" onChange={handleChange} />,
      FakeInitialState
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(handleChange).toBeCalledTimes(1);
  });
});
