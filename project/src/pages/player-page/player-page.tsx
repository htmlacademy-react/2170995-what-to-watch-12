import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction } from '../../store/api-actions';
import {
  getCurrentFilm,
  getFilmsDataLoading,
} from '../../store/film-data/film-data.selectors';
import { formatTime } from '../../utils';
import Loading from '../loading-page/loading';
import NotFoundPage from '../not-found-page/not-found-page';

export default function PlayerPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoading);
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const togglerRef = useRef<HTMLDivElement | null>(null);

  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [id, dispatch]);

  const film = useAppSelector(getCurrentFilm);

  if (film === undefined || isFilmsDataLoading) {
    return <Loading />;
  }

  if (!film || !id) {
    return <NotFoundPage />;
  }

  const playButtonClickHandler = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const playHandler = () => {
    setIsPlaying(true);
  };

  const pauseHandler = () => {
    setIsPlaying(false);
  };

  const fullScreenButtonClickHandler = () => {
    videoRef.current?.requestFullscreen();
  };

  const updateCurrentTimeHandler = () => {
    if (!videoRef.current || !progressRef.current || !togglerRef.current) {
      return;
    }

    const leftTime = Math.round(
      videoRef.current.duration - videoRef.current.currentTime
    );
    const leftTimeInPercents =
      100 - Math.trunc((leftTime / videoRef.current.duration) * 100);

    progressRef.current.value = leftTimeInPercents;
    togglerRef.current.style.left = `${leftTimeInPercents}%`;

    if (!countDown || leftTime < countDown) {
      setCountDown(leftTime);
    }
  };

  return (
    <div className='player'>
      <Helmet>
        <title>WTW Player</title>
      </Helmet>
      <video
        ref={videoRef}
        src={film.videoLink}
        className='player__video'
        poster={film.backgroundImage}
        autoPlay
        onEnded={() => setIsPlaying(false)}
        onPlay={playHandler}
        onPause={pauseHandler}
        onTimeUpdate={updateCurrentTimeHandler}
      />

      <button
        type='button'
        className='player__exit'
        onClick={() => navigate(`/films/${id}`)}
      >
        Exit
      </button>

      <div className='player__controls'>
        <div className='player__controls-row'>
          <div className='player__time'>
            <progress
              className='player__progress'
              value='0'
              max='100'
              ref={progressRef}
            />
            <div
              className='player__toggler'
              style={{ left: '0%' }}
              ref={togglerRef}
            >
              Toggler
            </div>
          </div>
          <div className='player__time-value'>{formatTime(countDown)}</div>
        </div>

        <div className='player__controls-row'>
          <button
            type='button'
            className='player__play'
            onClick={playButtonClickHandler}
          >
            <svg viewBox='0 0 19 19' width='19' height='19'>
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className='player__name'>{film.name}</div>

          <button
            type='button'
            className='player__full-screen'
            onClick={fullScreenButtonClickHandler}
          >
            <svg viewBox='0 0 27 27' width='27' height='27'>
              <use xlinkHref='#full-screen'></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
