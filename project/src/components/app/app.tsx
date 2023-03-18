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

import { TypeFilms } from '../../types/type-film';
import { TypeMainPage } from '../../types/type-main-page';

type AppProps = {
  title: TypeMainPage;
  films: TypeFilms;
}


function App({ title, films }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage title={title} films={films} />}
        />

        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListPage films={films} />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Player}
          element={<PlayerPage films={films} />}
        />

        <Route
          path={AppRoute.SignIn}
          element={<SignInPage />}
        />


        <Route path={AppRoute.Films}>
          <Route path={AppRoute.Film}>
            <Route index element={<MoviePage films={films} />} />
            <Route path={AppRoute.AddReview} element={<AddReviewPage films={films} />} />
          </Route>
        </Route>

        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
