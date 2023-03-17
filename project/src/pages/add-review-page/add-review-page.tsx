import { useParams, Link } from 'react-router-dom';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import ReviewForm from '../../components/review-form/review-form';

import { TypeFilms } from '../../types/type-film';
import { AppRoute } from '../../const';

type ReviewPageProps = {
  films: TypeFilms;
}

function AddReviewPage(props: ReviewPageProps): JSX.Element {
  const params = useParams();
  const [filmInReview] = props.films.filter((film) => film.id === Number(params.id));

  return (
    <section className='film-card film-card--full'>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img
            src={filmInReview?.backgroundImage}
            alt={filmInReview?.name}
          />
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header'>
          <div className='logo'>
            <Logo />
          </div>

          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <Link to={`${AppRoute.Film}${filmInReview.id}`} className='breadcrumbs__link'>
                  {filmInReview?.name}
                </Link>
              </li>
              <li className='breadcrumbs__item'>
                <Link to='/#' className='breadcrumbs__link'>Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className='film-card__poster film-card__poster--small'>
          <img
            src={filmInReview?.posterImage}
            alt={filmInReview?.name}
            width='218'
            height='327'
          />
        </div>
      </div>

      <div className='add-review'>
        <ReviewForm />
      </div>
    </section >
  );
}

export default AddReviewPage;
