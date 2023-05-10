import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

import { RoutePath } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  authenticationSelector,
  authSelector,
  authSuccess,
  setAuthenticated,
} from '../../store/slices';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(authenticationSelector);
  const { isAuthenticated } = useAppSelector(authSelector);

  useEffect(() => {
    const token = Cookies.get('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      Cookies.remove('token');
      localStorage.removeItem('user');
      dispatch(setAuthenticated(false));
      navigate(RoutePath.auth, { replace: true });
    }

    if (token && user && !userData) {
      dispatch(authSuccess(JSON.parse(user)));
    }
  }, [navigate, dispatch, userData]);

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
