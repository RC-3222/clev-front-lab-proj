import { useLocation, useParams } from 'react-router-dom';

import { NavType } from '../../../enums';
import { useBooleanState } from '../../../hooks';
import { MenuList } from '../menu-list';

import styles from './menu-desktop.module.scss';

export const MenuDesktop = () => {
  const { pathname } = useLocation();
  const { category: categoryLocation } = useParams();

  const { state: isOpenGenre, toggle: toggleIsOpenGenre } = useBooleanState(true);

  return (
    <nav className={styles.navDesktop}>
      <MenuList
        pathname={pathname}
        categoryLocation={categoryLocation}
        toggleIsOpenGenre={toggleIsOpenGenre}
        isOpenGenre={isOpenGenre}
        type={NavType.desktop}
      />
    </nav>
  );
};
