import { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import VideoPlayer from '../video-player/video-player';

// types
import { Film } from '../../types/film';

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <article
      className='small-film-card catalog__films-card'
      onMouseEnter={() => setActiveCard(film.id)}
      onMouseLeave={() => setActiveCard(null)}
    >
      <Link className='small-film-card__link' to={`/films/${film.id}`}>
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
        <h3 className='small-film-card__title'>{film.name}</h3>
      </Link>
    </article>
  );
}
