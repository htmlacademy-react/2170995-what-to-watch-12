import { Link } from 'react-router-dom';

import FilmList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';

import { TypeFilms } from '../../types/type-film';
import { TypeMainPage } from '../../types/type-main-page';

type MainPagaProps = {
  title: TypeMainPage;
  films: TypeFilms;
}


function MainPage({ title, films }: MainPagaProps): JSX.Element {
  return (
    <>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img
            src='img/bg-the-grand-budapest-hotel.jpg'
            alt='The Grand Budapest Hotel'
          />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header film-card__head'>
          <div className='logo'>
            <Logo />
          </div>
          <UserBlock />
        </header>

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img
                src='img/the-grand-budapest-hotel-poster.jpg'
                alt='The Grand Budapest Hotel poster'
                width='218'
                height='327'
              />
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{title.title}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{title.genre}</span>
                <span className='film-card__year'>{title.year}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <ul className='catalog__genres-list'>
            <li className='catalog__genres-item catalog__genres-item--active'>
              <Link to='/#' className='catalog__genres-link'>
                All genres
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Comedies
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Crime
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Documentary
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Dramas
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Horror
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Kids & Family
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Romance
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Sci-Fi
              </Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='/#' className='catalog__genres-link'>
                Thrillers
              </Link>
            </li>
          </ul>

          <div className='catalog__films-list'>
            <FilmList films={films} />
          </div>

          <div className='catalog__more'>
            <button className='catalog__button' type='button'>
              Show more
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainPage;