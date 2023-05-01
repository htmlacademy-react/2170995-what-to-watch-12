import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentFilm } from '../../store/film-data/film-data.selectors';

// pages
import NotFoundPage from '../not-found-page/not-found-page';

// components
import UserBlock from '../../components/user-block/user-block';
import MainLogo from '../../components/logo/main-logo';
import CommentForm from '../../components/comment-form/comment-form';
import { fetchFilmAction } from '../../store/api-actions';

export default function AddReviewPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [id, dispatch]);

  const film = useAppSelector(getCurrentFilm);

  if (!film || !id) {
    return <NotFoundPage />;
  }

  return (
    <section
      className='film-card film-card--full'
      style={{ backgroundColor: `${film.backgroundColor}` }}
    >
      <Helmet>
        <title>WTW Add review</title>
      </Helmet>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header'>
          <MainLogo />

          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <Link to='..' relative='path' className='breadcrumbs__link'>
                  {film.name}
                </Link>
              </li>
              <li className='breadcrumbs__item'>
                <Link to='#' className='breadcrumbs__link'>
                  Add review
                </Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className='film-card__poster film-card__poster--small'>
          <img
            src={film.posterImage}
            alt={film.name}
            width='218'
            height='327'
          />
        </div>
      </div>

      <CommentForm />
    </section>
  );
}
