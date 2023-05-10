import { Outlet } from 'react-router-dom';

import { Container } from '../../common/container';
import { MenuDesktop } from '../../menu';

import styles from './layout-main.module.scss';

export const LayoutMain = () => (
  <div className={styles.layoutMain}>
    <Container>
      <div className={styles.layoutMainContainer}>
        <MenuDesktop />
        <Outlet />
      </div>
    </Container>
  </div>
);
