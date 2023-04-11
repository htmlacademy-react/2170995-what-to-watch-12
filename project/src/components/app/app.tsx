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
import PrivateRoute from '../private-route/private-route';

// types
import { FilmCardDescription } from '../../types/film-card-description';
import { ReviewMockTypes } from '../../types/review-mock-type';

// const
import { AppRoute, AuthorizationStatus } from '../../const';

type AppProps = {
  filmCardDescription: FilmCardDescription;
  reviews: ReviewMockTypes;
};

function App({ filmCardDescription, reviews }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage filmCardDescription={filmCardDescription} />}
          />

          <Route path={AppRoute.AddReview} element={<AddReviewPage />} />

          <Route
            path={AppRoute.Film}
            element={<FilmPage reviews={reviews} />}
          />

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
