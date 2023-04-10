import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { changeFilm } from './store/action';

import { mockFilms } from './mocks/mock-films';
import { mockReviews } from './mocks/mock-reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const films = mockFilms;
store.dispatch(changeFilm({ films }));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        filmCardDescription={{
          title: 'The Grand Budapest Hotel',
          genre: 'Drama',
          year: 2014,
        }}
        reviews={mockReviews}
      />
    </Provider>
  </React.StrictMode>
);
