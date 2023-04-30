import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {
  AuthorizationStatus,
  AppRoute,
  DEFAULT_GENRE,
  NameSpace,
} from '../../const';
import App from './app';
import { mockFilms, mockReviews, mockUser } from '../../utils/mocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockFilm = mockFilms[1];

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: mockUser,
    favoriteFilms: mockFilms,
  },
  [NameSpace.Data]: {
    films: mockFilms,
    reviews: mockReviews,
    isFilmsDataLoading: false,
    isReviewsDataLoading: false,
    genre: DEFAULT_GENRE,
    promoFilm: mockFilm,
    currentFilm: mockFilm,
    hasError: false,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  test('should render "Main page" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('All genre')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  test('should render "Sign in page" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('should render "Film" when user navigate to "/films/:id"', () => {
    history.push(`/films/${mockFilms[1].id}`);

    render(fakeApp);

    expect(screen.getByText(`${mockFilms[1].name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilms[1].genre}`)).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  test('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });

  test('should render "Player" when user navigate to "/player/:id"', () => {
    history.push(`/player/${mockFilms[1].id}`);

    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });
});
