import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type AuthRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

export default function AuthRoute({
  authorizationStatus,
  children,
}: AuthRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    <Navigate to={AppRoute.Main} />
  ) : (
    children
  );
}
