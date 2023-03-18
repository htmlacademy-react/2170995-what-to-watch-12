import { Link } from 'react-router-dom';

import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';

function PageNotFound(): JSX.Element {
  return (
    <div className='user-page'>
      <section className="film-card">
        <div className="film-card__bg">
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Logo />
          </div>
          <UserBlock />
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
      <Footer />
    </div>
  );
}

export default PageNotFound;
