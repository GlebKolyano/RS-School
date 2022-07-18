import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { FakeInitialState } from '../../../tests/contatns';
import { renderWithRedux } from '../../../tests/helpers/renderWithRedux';
import Reset from '.';

// interface IFakeStorage {
//   field?: string;
// }

// type TKeyOfStorage = keyof IFakeStorage;

// const fakeStorage = (() => {
//   let store: IFakeStorage = {};

//   return {
//     get: (key: string) => {
//       return store[key as TKeyOfStorage] || null;
//     },
//     setItem: (key: string, value: string) => {
//       store[key as TKeyOfStorage] = value.toString();
//     },
//     remove: (key: string) => {
//       delete store[key as TKeyOfStorage];
//     },
//     clear: () => {
//       store = {};
//     }
//   };
// })() as unknown as Storage;

// beforeEach(() => {
//   window.localStorage = fakeStorage;
// });

describe('reset', () => {
  test('renders itself', () => {
    renderWithRedux(<Reset />, FakeInitialState);
    const resetComponent = screen.getByTestId('reset');
    expect(resetComponent).toBeInTheDocument();
  });

  test('renders buttons', () => {
    renderWithRedux(<Reset />, FakeInitialState);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  // test('button correctly clear storage', () => {
  //   renderWithRedux(<Reset />, FakeInitialState);
  //   const resetStorageBtn = screen.getByText(/Сбросить настройки/i);
  //   const btn1 = screen.getAllByRole('button');
  //   window.localStorage.setItem('field', 'value');
  //   userEvent.click(btn1[1]);
  //   expect(window.localStorage.getItem('field')).toEqual(null);
  // });
});
