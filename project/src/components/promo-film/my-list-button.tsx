import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFilmStatusAction } from '../../store/api-actions';
import { getPromoFilmId } from '../../store/film-data/film-data.selectors';
import { getFavoriteFilmsCount } from '../../store/user-process/user-process.selectors';

// const
import { AppRoute } from '../../const';

type MyListButtonProps = {
  isAuth: boolean;
  isFavorite: boolean;
  filmId: string;
};

export default function MyListButton({
  isAuth,
  isFavorite,
  filmId,
}: MyListButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const newStatus = isFavorite ? 0 : 1;
  const promoId = useAppSelector(getPromoFilmId);
  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (isAuth) {
      dispatch(
        setFilmStatusAction({
          filmId,
          status: newStatus,
          isPromo: `${promoId}` === filmId,
        })
      );
    } else {
      navigate(AppRoute.SignIn);
    }
  };

  return (
    <button
      className='btn btn--list film-card__button'
      type='button'
      onClick={onClickHandler}
    >
      {isAuth ? (
        <svg viewBox='0 0 19 20' width='19' height='20'>
          <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
        </svg>
      ) : (
        ''
      )}

      <span style={{ marginLeft: !isAuth ? '10px' : '' }}>My list</span>
      <span className={cn('film-card__count', { 'visually-hidden': !isAuth })}>
        {favoriteFilmsCount}
      </span>
    </button>
  );
}
