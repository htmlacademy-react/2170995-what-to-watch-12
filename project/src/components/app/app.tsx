import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';

import AddReviewPage from '../../pages/add-review-page/add-review-page';
import MoviePage from '../../pages/movie-page/movie-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import PlayerPage from '../../pages/player-page/player-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MainPage from '../../pages/main-page/main-page';

type AppPageProps = {
  title: string;
  genre: string;
  year: number;
};

function App({ title, genre, year }: AppPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage title={title} genre={genre} year={year} />}
        />

        <Route
          path={AppRoute.AddReview}
          element={<AddReviewPage />}
        />

        <Route
          path={AppRoute.Film}
          element={<MoviePage />}
        />

        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage />
            </PrivateRoute>
          }
        />

        <Route
          path='*'
          element={<PageNotFound />}
        />

        <Route
          path={AppRoute.Player}
          element={<PlayerPage />}
        />

        <Route
          path={AppRoute.SignIn}
          element={<SignInPage />}
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
