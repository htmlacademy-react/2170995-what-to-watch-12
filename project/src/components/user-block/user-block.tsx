import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../../const';
import {
  getAuthorizationStatus,
  getUserInfo,
} from '../../store/user-process/user-process.selectors';

export default function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { avatarUrl } = useAppSelector(getUserInfo);

  const onClick = () => {
    dispatch(logoutAction());
  };

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <ul className='user-block'>
      <li className='user-block__item'>
        <div className='user-block__avatar'>
          <Link to={AppRoute.MyList}>
            <img src={avatarUrl} alt='User avatar' width='63' height='63' />
          </Link>
        </div>
      </li>
      <li className='user-block__item'>
        <Link to={AppRoute.Main} onClick={onClick} className='user-block__link'>
          Sign out
        </Link>
      </li>
    </ul>
  ) : (
    <div className='user-block'>
      <Link to={AppRoute.SignIn} className='user-block__link'>
        Sign in
      </Link>
    </div>
  );
}
