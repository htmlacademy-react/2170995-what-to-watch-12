import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import SignInPage from './sign-in-page';

const mockStore = configureMockStore();

describe('Component: SignInPage', () => {
  test('should render "SignInPage" when user navigate to "login" url', async () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <SignInPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'squbert');
    await userEvent.type(screen.getByTestId('password'), 'fad2231');

    expect(screen.getByDisplayValue(/squbert/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/fad2231/i)).toBeInTheDocument();
  });
});
