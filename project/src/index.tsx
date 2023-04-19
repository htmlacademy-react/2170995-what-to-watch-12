import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { store } from './store';

import { checkAuthAction, fetchFilmAction } from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        filmCardDescription={{
          title: 'The Grand Budapest Hotel',
          genre: 'Drama',
          year: 2014,
        }}
      />
    </Provider>
  </React.StrictMode>
);
