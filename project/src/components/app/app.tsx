import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

// pages
import MainPage from '../../pages/main-page/main-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import FilmPage from '../../pages/film-page/film-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlayerPage from '../../pages/player-page/player-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import PrivateRoute from '../private-route/private-route';
import Loading from '../../pages/loading-page/loading';

// types
import { FilmCardDescription } from '../../types/film-card-description';

// const
import { AppRoute, AuthorizationStatus } from '../../const';

type AppProps = {
  filmCardDescription: FilmCardDescription;
};

function App({ filmCardDescription }: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const isFilmsDataLoading = useAppSelector(
    (state) => state.isFilmsDataLoading
  );

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isFilmsDataLoading
  ) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage filmCardDescription={filmCardDescription} />}
          />

          <Route path={AppRoute.AddReview} element={<AddReviewPage />} />

          <Route path={AppRoute.Film} element={<FilmPage />} />

          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListPage />
              </PrivateRoute>
            }
          />

          <Route path={AppRoute.Player} element={<PlayerPage />} />

          <Route path={AppRoute.SignIn} element={<SignInPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
