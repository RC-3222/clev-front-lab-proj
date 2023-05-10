import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { DataTestId, RoutePath } from '../../../enums';
import { useAppSelector } from '../../../store/hooks';
import { authSelector } from '../../../store/slices';

import styles from './layout-auth.module.scss';

export const LayoutAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(authSelector);

  useEffect(() => {
    if (isAuthenticated) navigate(RoutePath.main);
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.layoutAuthentication} data-test-id={DataTestId.auth}>
      <h1 className={styles.title}>Cleverland</h1>
      <div className={styles.childrenContainer}>
        <Outlet />
      </div>
    </div>
  );
};
