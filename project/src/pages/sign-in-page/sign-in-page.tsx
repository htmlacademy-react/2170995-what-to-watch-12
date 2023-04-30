import { Helmet } from 'react-helmet-async';
import { useRef, FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

// components
import MainLogo from '../../components/logo/logo-main';
import Footer from '../../components/footer/footer';

// types
import { AuthData } from '../../types/auth-data';

export default function SignInPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const isValid = /(?=.*[0-9])(?=.*[a-zA-Z])/g;

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (
      loginRef.current !== null &&
      passwordRef.current !== null &&
      passwordRef.current.value.match(isValid)
    ) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      setError(
        'The field should not be empty and the password field must contain at least one digit and a letter'
      );
    }
  };

  return (
    <div className='user-page'>
      <Helmet>
        <title>WTW Sing in page</title>
      </Helmet>
      <header className='page-header user-page__head'>
        <MainLogo />

        <h1 className='page-title user-page__title'>Sign in</h1>
      </header>

      <div className='sign-in user-page__content'>
        <form action='#' className='sign-in__form' onSubmit={handleSubmit}>
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                ref={loginRef}
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                data-testid='login'
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-email'
              >
                Email address
              </label>
            </div>
            <div className='sign-in__field'>
              <input
                ref={passwordRef}
                className='sign-in__input'
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                data-testid='password'
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-password'
              >
                Password
              </label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button className='sign-in__btn' type='submit'>
              Sign in
            </button>
          </div>

          {error && (
            <div style={{ color: 'red' }} onClick={() => setError('')}>
              {error}
            </div>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}
