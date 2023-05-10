import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { authenticatedUserRequest, toastSelector } from '../../../store/slices';
import { Toast } from '../../common/toast';

import { Footer } from './footer';
import { Header } from './header';

import styles from './layout-general.module.scss';

export const LayoutGeneral = () => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticatedUserRequest());
  }, [dispatch]);

  const { message, type, isToastVisible } = useAppSelector(toastSelector);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <>
      <div className={styles.layout}>
        <Header />
        <Outlet />
        <Footer />
      </div>
      {isToastVisible && <Toast message={message} type={type} />}
    </>
  );
};
