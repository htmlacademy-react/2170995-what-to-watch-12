import { useNavigate } from 'react-router-dom';

type VideoPlayerButtonProps = {
  filmId: string;
};

export default function VideoPlayerButton({
  filmId,
}: VideoPlayerButtonProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <button
      className='btn btn--play film-card__button'
      type='button'
      onClick={() => navigate(`/player/${filmId}`)}
    >
      <svg viewBox='0 0 19 19' width='19' height='19'>
        <use xlinkHref='#play-s'></use>
      </svg>
      <span>Play</span>
    </button>
  );
}
