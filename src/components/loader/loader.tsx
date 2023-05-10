import loaderIcon from '../../assets/images/loader.svg';
import { DataTestId } from '../../enums';

import styles from './loader.module.scss';

export const Loader = () => (
  <div className={styles.loader} data-test-id={DataTestId.loader}>
    <img src={loaderIcon} alt='Loader...' />
  </div>
);
