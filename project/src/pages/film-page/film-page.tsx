import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

// components
import UserBlock from '../../components/UserBlock';
import MainLogo from '../../components/logo/Main-logo';
import PageContent from '../../components/PageContent';

// types
import { FilmMockTypes } from '../../types/filmsMockType';

type FilmPageProps = {
  films: FilmMockTypes;
};

export default function FilmPage({ films }: FilmPageProps): JSX.Element {
  const params = useParams();
  const filmInfo = films.find((film) => film.id === Number(params.id));

  return (
    <>
      <section className='film-card film-card--full'>
        <Helmet>
          <title>WTW Film info</title>
        </Helmet>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={filmInfo?.backgroundImage} alt={filmInfo?.name} />
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header film-card__head'>
            <MainLogo />

            <UserBlock />
          </header>

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{filmInfo?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{filmInfo?.genre}</span>
                <span className='film-card__year'>{filmInfo?.released}</span>
              </p>

              <div className='film-card__buttons'>
                <button
                  className='btn btn--play film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className='btn btn--list film-card__button'
                  type='button'
                >
                  <svg viewBox='0 0 19 20' width='19' height='20'>
                    <use xlinkHref='#add'></use>
                  </svg>
                  <span>My list</span>
                  <span className='film-card__count'>{films.length}</span>
                </button>
                <Link to='review' className='btn film-card__button'>
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img
                src={filmInfo?.posterImage}
                alt={filmInfo?.name}
                width='218'
                height='327'
              />
            </div>

            <div className='film-card__desc'>
              <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                  <li className='film-nav__item film-nav__item--active'>
                    <a href='/#' className='film-nav__link'>
                      Overview
                    </a>
                  </li>
                  <li className='film-nav__item'>
                    <a href='/#' className='film-nav__link'>
                      Details
                    </a>
                  </li>
                  <li className='film-nav__item'>
                    <a href='/#' className='film-nav__link'>
                      Reviews
                    </a>
                  </li>
                </ul>
              </nav>

              <div className='film-rating'>
                <div className='film-rating__score'>{filmInfo?.rating}</div>
                <p className='film-rating__meta'>
                  <span className='film-rating__level'>Very good</span>
                  <span className='film-rating__count'>240 ratings</span>
                </p>
              </div>

              <div className='film-card__text'>
                {filmInfo?.description}

                <p className='film-card__director'>
                  <strong>{filmInfo?.director}</strong>
                </p>

                <p className='film-card__starring'>
                  <strong>{filmInfo?.starring}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageContent />
    </>
  );
}