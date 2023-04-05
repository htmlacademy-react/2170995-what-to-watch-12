import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { mockFilms } from './mocks/mock-films';
import { mockReviews } from './mocks/mock-reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      filmCardDescription={{
        title: 'The Grand Budapest Hotel',
        genre: 'Drama',
        year: 2014,
      }}
      films={mockFilms}
      reviews={mockReviews}
    />
  </React.StrictMode>
);
