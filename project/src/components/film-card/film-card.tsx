import { useState } from 'react';

// components
import VideoPlayer from '../video-player/video-player';

// types
import { Link } from 'react-router-dom';
import { FilmMockType } from '../../types/films-mock-type';

type FilmCardProps = {
  film: FilmMockType;
};

export default function FilmCard({ film }: FilmCardProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <article
      className='small-film-card catalog__films-card'
      onMouseEnter={() => setActiveCard(film.id)}
      onMouseLeave={() => setActiveCard(null)}
    >
      <div className='small-film-card__image'>
        {activeCard === film.id ? (
          <VideoPlayer
            src={film.previewVideoLink}
            poster={film.previewImage}
            isActive={film.id === activeCard}
          />
        ) : (
          <img
            src={film.previewImage}
            alt={film.name}
            width='280'
            height='175'
          />
        )}
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}
