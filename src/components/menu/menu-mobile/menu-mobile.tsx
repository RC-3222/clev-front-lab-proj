import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { DataTestId, NavType } from '../../../enums';
import { useBooleanState } from '../../../hooks';
import { MenuList } from '../menu-list';

import styles from './menu-mobile.module.scss';

type MenuMobileProps = {
  hideMobileMenu: () => void;
  isOpened: boolean;
}

export const MenuMobile = ({ hideMobileMenu, isOpened }: MenuMobileProps) => {
  const { pathname } = useLocation();
  const { category: categoryLocation } = useParams();

  const { state: isOpenGenre, toggle: toggleIsOpenGenre } = useBooleanState(true);

  return (
    <nav
      className={classNames(styles.navMobile, isOpened && styles.active)}
      data-test-id={DataTestId.burgerNavigation}
    >
      <MenuList
        pathname={pathname}
        categoryLocation={categoryLocation}
        toggleIsOpenGenre={toggleIsOpenGenre}
        isOpenGenre={isOpenGenre}
        hideMobileMenu={hideMobileMenu}
        type={NavType.mobile}
      />
    </nav>
  );
};
