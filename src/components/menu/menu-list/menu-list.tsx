import { Fragment, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

import { ReactComponent as Chevron } from '../../../assets/images/chevron.svg';
import { AllBooks, DataTestId, NavType, Page, RoutePath } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { booksSelector, categoriesSelector, setAuthenticated } from '../../../store/slices';
import { createNavCategories } from '../../../utils';

import styles from './menu-list.module.scss';

const getDataTestIds = (
  navType: NavType,
  path: string,
  type: 'category-name' | 'category-quantity' = 'category-name'
) => {
  if (type === 'category-name') {
    if (navType === NavType.desktop)
      return path === AllBooks.path ? DataTestId.navigationBooks : `navigation-${path}`;

    return path === AllBooks.path ? DataTestId.burgerBooks : `burger-${path}`;
  }

  return navType === NavType.desktop
    ? `navigation-book-count-for-${path}`
    : `burger-book-count-for-${path}`;
};

type MenuListProps = {
  pathname: string;
  toggleIsOpenGenre: () => void;
  isOpenGenre: boolean;
  categoryLocation?: string;
  type: NavType;
  hideMobileMenu?: () => void;
}

export const MenuList = ({
  pathname,
  toggleIsOpenGenre,
  isOpenGenre,
  categoryLocation,
  type,
  hideMobileMenu,
}: MenuListProps) => {
  const navigate = useNavigate();

  const { books } = useAppSelector(booksSelector);
  const { categories } = useAppSelector(categoriesSelector);

  const dispatch = useAppDispatch();

  const navCategories = useMemo(
    () => books && categories && createNavCategories(books, categories),
    [books, categories]
  );

  const generalLinkHandler = (shouldCloseDrowpdown = true) => {
    if (hideMobileMenu) hideMobileMenu();
    if (isOpenGenre && shouldCloseDrowpdown) toggleIsOpenGenre();
  };

  const logoutHandler = () => {
    generalLinkHandler();
    Cookies.remove('token');
    localStorage.removeItem('user');
    dispatch(setAuthenticated(false));
    navigate(RoutePath.auth);
  };

  return (
    <Fragment>
      <ul className={styles.categoriesMenuList}>
        <li>
          <button
            className={classNames(styles.categoriesMenuItem, {
              [styles.active]: isOpenGenre || pathname.includes(Page.books),
            })}
            onClick={() => {
              toggleIsOpenGenre();
            }}
            data-test-id={
              type === NavType.desktop ? DataTestId.navigationShowcase : DataTestId.burgerShowcase
            }
            type='button'
          >
            <span>Витрина книг</span>
            <span
              className={classNames(styles.iconWrapper, {
                [styles.active]: isOpenGenre,
              })}
            >
              <Chevron
                className={classNames(styles.icon, {
                  [styles.active]: isOpenGenre || pathname.includes(Page.books),
                })}
              />
            </span>
          </button>
          <ul
            className={classNames(styles.genreList, {
              [styles.visible]: isOpenGenre,
            })}
          >
            {navCategories &&
              navCategories.map(({ id, path, name, quantity }) => (
                <li className={classNames(styles.genre)} key={id}>
                  <Link
                    to={`/${Page.books}/${path}`}
                    className={classNames(styles.genreLink, {
                      [styles.activeGenreLink]: categoryLocation === path,
                    })}
                    onClick={() => generalLinkHandler(!pathname.includes(Page.books))}
                    state={{ bookQuantity: quantity }}
                  >
                    <span data-test-id={getDataTestIds(type, path)}>{name}</span>
                    <span
                      className={styles.quantity}
                      data-test-id={getDataTestIds(type, path, 'category-quantity')}
                    >
                      {quantity}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li
          className={classNames(styles.categoriesMenuItem, {
            [styles.active]: pathname === RoutePath.terms,
          })}
          data-test-id={
            type === NavType.desktop ? DataTestId.navigationTerms : DataTestId.burgerTerms
          }
        >
          <Link to={RoutePath.terms} onClick={() => generalLinkHandler()}>
            Правила пользования
          </Link>
        </li>
        <li
          className={classNames(styles.categoriesMenuItem, {
            [styles.active]: pathname === RoutePath.contract,
          })}
          data-test-id={
            type === NavType.desktop ? DataTestId.navigationContract : DataTestId.burgerContract
          }
        >
          <Link to={RoutePath.contract} onClick={() => generalLinkHandler()}>
            Договор оферты
          </Link>
        </li>
      </ul>
      {type === NavType.mobile && (
        <ul className={styles.categoriesMenuList}>
          <li
            className={classNames(styles.categoriesMenuItem, {
              [styles.active]: pathname === RoutePath.profile,
            })}
            onClick={() => generalLinkHandler()}
            role='presentation'
          >
            <Link to={RoutePath.profile}>Профиль</Link>
          </li>
          <li
            className={classNames(styles.categoriesMenuItem)}
            onClick={logoutHandler}
            role='presentation'
            data-test-id={DataTestId.exitButton}
          >
            Выход
          </li>
        </ul>
      )}
    </Fragment>
  );
};
