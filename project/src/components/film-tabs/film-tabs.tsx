import { Link } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

// components
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';

// types
import { Film } from '../../types/film';

// const
import { FilmTabsType } from '../../const';

type FilmTabsProps = {
  film: Film | undefined;
};

const filmPageTabs = Object.values(FilmTabsType);

export default function FilmTabs({ film }: FilmTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmTabsType.Overview);

  const getTabByType = () => {
    switch (activeTab) {
      case FilmTabsType.Overview:
        return <FilmOverview film={film} />;
      case FilmTabsType.Details:
        return <FilmDetails film={film} />;
      case FilmTabsType.Reviews:
        return <FilmReviews />;
    }
  };

  return (
    <div className='film-card__desc'>
      <nav className='film-nav film-card__nav'>
        <ul className='film-nav__list'>
          {filmPageTabs.map((filmTab) => (
            <li
              className={cn('film-nav__item', {
                'film-nav__item--active': activeTab === filmTab,
              })}
              key={filmTab}
            >
              <Link
                to=''
                className='film-nav__link'
                onClick={() => setActiveTab(filmTab)}
              >
                {filmTab}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {getTabByType()}
    </div>
  );
}
