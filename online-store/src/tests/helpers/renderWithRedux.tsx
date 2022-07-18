import { ReactFragment } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IFilterByRangeInitialState, IStoreInitialState } from '../../global/models';
import { setupStore } from '../../store/store';

export const renderWithRedux = (
  component: JSX.Element | ReactFragment,
  initialState: IStoreInitialState
) => {
  const store = setupStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};
