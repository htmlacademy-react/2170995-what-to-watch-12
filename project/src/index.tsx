import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import { store } from './store';

import { checkAuthAction, fetchFilmAction } from './store/api-actions';

store.dispatch(fetchFilmAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
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
