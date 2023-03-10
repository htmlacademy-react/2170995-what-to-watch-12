import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';

function PageNotFound(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <div className="logo">
          <Logo />
        </div>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src="img/avatar.jpg"
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </li>
          <li className="user-block__item">
            <Link to="/#" className="user-block__link">Sign out</Link>
          </li>
        </ul>
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__desc">
            <h1><b>404.</b> That&apos;s an error</h1>
            <p>The requested URL was not found on this server.</p>
            <p>Try again at a different address</p>
            <Link to="/">Back to the main page</Link>
          </div>
        </div>
      </div>
    </section >
  );
}

export default PageNotFound;
