import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

import { BASE_URL } from '../../../../api';
import avatar from '../../../../assets/images/avatar.png';
import logo from '../../../../assets/images/logo.png';
import { DataTestId, Page, RoutePath } from '../../../../enums';
import { useBooleanState } from '../../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  bookInfoSelector,
  bookingSelector,
  booksSelector,
  categoriesSelector,
  getBooksRequest,
  getCategoriesRequest,
  reviewSelector,
  setAuthenticated,
  userSelector,
} from '../../../../store/slices';
import { Burger } from '../../../common/burger';
import { Container } from '../../../common/container';
import { Loader } from '../../../loader';
import { MenuMobile } from '../../../menu';
import { OverlayMask } from '../../../overlay-mask';
import { OverlayWithPortal } from '../../../overlay-with-portal';

import styles from './header.module.scss';

export const Header = () => {
  const {
    state: isShowMobileMenu,
    setFalse: hideMobileMenu,
    toggle: toggleMenu,
  } = useBooleanState();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isProfilePage = pathname.includes(Page.profile);

  const { categories, isLoading: isLoadingCategories } = useAppSelector(categoriesSelector);
  const { isLoading: isLoadingBookInfo } = useAppSelector(bookInfoSelector);
  const { books, isLoading: isLoadingBooks } = useAppSelector(booksSelector);
  const { isLoadingBooking } = useAppSelector(bookingSelector);
  const { data: user, isLoading: isLoadingUser } = useAppSelector(userSelector);
  const { isLoading: isLoadingReview } = useAppSelector(reviewSelector);

  const isLoading =
    isLoadingCategories ||
    isLoadingBooks ||
    (!isProfilePage && (isLoadingBooking || isLoadingBookInfo)) ||
    isLoadingReview ||
    (isProfilePage && isLoadingUser);

  const onClickLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    dispatch(setAuthenticated(false));
    navigate(RoutePath.auth, { replace: true });
  };

  useEffect(() => {
    if (!pathname.includes(Page.books) && !books && !isLoadingBooks) dispatch(getBooksRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!categories) dispatch(getCategoriesRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleText = pathname.includes(Page.profile) ? 'Личный кабинет' : 'Библиотека';

  return (
    <>
      <Container>
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <Burger toggle={toggleMenu} isMenuOpen={isShowMobileMenu} />
            <Link to={RoutePath.main} className={styles.logoWrapper}>
              <img src={logo} alt='logo' />
            </Link>
            <h1 className={styles.title}>{titleText}</h1>
          </div>
          <div className={styles.user}>
            <span className={styles.userName}>Привет, {user?.firstName}</span>
            <div className={styles.avatarWrapper} role='presentation'>
              <img src={user?.avatar ? `${BASE_URL}${user?.avatar}` : avatar} alt='user' />
            </div>
            <div className={styles.userMenu}>
              <ul>
                <li>
                  <Link to={RoutePath.profile} data-test-id={DataTestId.profileButton}>
                    Профиль
                  </Link>
                </li>
                <li onClick={onClickLogout} role='presentation'>
                  Выйти
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <MenuMobile isOpened={isShowMobileMenu} hideMobileMenu={hideMobileMenu} />
      <OverlayMask onClose={hideMobileMenu} isOpened={isShowMobileMenu} />
      {isLoading && (
        <OverlayWithPortal>
          <Loader />
        </OverlayWithPortal>
      )}
    </>
  );
};
