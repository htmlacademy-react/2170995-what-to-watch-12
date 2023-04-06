import { Link } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

// components
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';

// types
import { FilmMockType } from '../../types/films-mock-type';
import { ReviewMockTypes } from '../../types/review-mock-type';

// const
import { FilmTabsType } from '../../const';

type FilmTabsProps = {
  film: FilmMockType | undefined;
  reviews: ReviewMockTypes;
};

const filmPageTabs = Object.values(FilmTabsType);

export default function FilmTabs({
  film,
  reviews,
}: FilmTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(FilmTabsType.Overview);

  const getTabByType = () => {
    switch (activeTab) {
      case FilmTabsType.Overview:
        return <FilmOverview film={film} />;
      case FilmTabsType.Details:
        return <FilmDetails film={film} />;
      case FilmTabsType.Reviews:
        return <FilmReviews reviews={reviews} />;
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
