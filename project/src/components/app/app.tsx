import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// pages
import MainPage from '../../pages/main-page/main-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import FilmPage from '../../pages/film-page/film-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlayerPage from '../../pages/player-page/player-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import PrivateRoute from '../Private-route';

// types
import { filmCardDescription } from '../../types/filmCardDescription';

// const
import { AppRoute, AuthorizationStatus } from '../../const';

function App({ title, genre, year }: filmCardDescription): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage title={title} genre={genre} year={year} />}
          />

          <Route path={AppRoute.AddReview} element={<AddReviewPage />} />

          <Route path={AppRoute.Film} element={<FilmPage />} />

          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <MyListPage />
              </PrivateRoute>
            }
          />

          <Route path={AppRoute.Player} element={<PlayerPage />} />

          <Route path={AppRoute.SignIn} element={<SignInPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
