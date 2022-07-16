import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import App from './App';
import { INITIAL_STATE } from './store/constants';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = setupStore(INITIAL_STATE);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
