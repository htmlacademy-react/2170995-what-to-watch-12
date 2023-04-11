import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

// components
import UserBlock from '../../components/user-block/user-block';
import MainLogo from '../../components/logo/logo-main';
import CommentForm from '../../components/comment-form/comment-form';

export default function AddReviewPage(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const params = useParams();
  const filmCard = films.find((film) => film.id === Number(params.id));
  return (
    <section className='film-card film-card--full'>
      <Helmet>
        <title>WTW Add review</title>
      </Helmet>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={filmCard?.backgroundImage} alt={filmCard?.name} />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header'>
          <MainLogo />

          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <Link to='..' relative='path' className='breadcrumbs__link'>
                  {filmCard?.name}
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
            src={filmCard?.posterImage}
            alt={filmCard?.name}
            width='218'
            height='327'
          />
        </div>
      </div>

      <CommentForm />
    </section>
  );
}
