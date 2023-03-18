import { Link } from 'react-router-dom';
import { TypeFilm } from '../../types/type-film';


type FilmCardProps = {
  film: TypeFilm;
  onMouseEnterHandler: () => void;
}

function FilmCard({ film, onMouseEnterHandler }: FilmCardProps): JSX.Element {

  return (
    <article className='small-film-card catalog__films-card' onMouseEnter={onMouseEnterHandler}>
      <div className='small-film-card__image'>
        <img
          src={film.previewImage}
          alt={film.name}
          width='280'
          height='175'
        />
      </div>
      <h3 className='small-film-card__title'>
        <Link className='small-film-card__link' to={`films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
